import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, filter, map, pairwise, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

export interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface Trade {
  s: string;
  p: number;
  v: number;
}

export interface TradeEvent {
  type: string;
  symbol: string;
  data?: Trade[];
}

export interface MonthInsiderSentiment {
  change: number;
  month: number;
  year: number;
  mspr: number;
}

@Injectable()
export class FinnhubService implements OnDestroy {

  public readonly trades: Observable<Trade[]>;

  private token = 'bu4f8kn48v6uehqi3cqg';
  private apiRoutes = {
    symbolSearch: 'search',
    quote: 'quote',
    insiderSentiment: 'stock/insider-sentiment'
  };

  private webSocketUrl = `wss://ws.finnhub.io?token=${this.token}`;
  private socket = webSocket<TradeEvent>(this.webSocketUrl);
  private userTradesUpdateToken = new BehaviorSubject<string[]>([]);

  private descriptionCache = new Map<string, string>();

  constructor(private http: HttpClient) {
    // open connection
    this.socket.subscribe();

    // real time trade flow
    this.trades = this.socket.pipe(
      filter((event: TradeEvent) => event.type === 'trade'),
      map((event: TradeEvent) => {
        return event.data ?? [];
      }));

    // trade flow update from user selection
    this.userTradesUpdateToken.pipe(pairwise()).
      subscribe(([prev, curr]) => {

        const removedSymbols = prev.filter(p => !curr.some(c => c === p));
        const addedSymbols = curr.filter(c => !prev.some(p => p === c));

        removedSymbols.forEach(s => {
          this.socket.next({ 'type': 'unsubscribe', 'symbol': s });
        });

        addedSymbols.forEach(s =>
          this.socket.next({ 'type': 'subscribe', 'symbol': s })
        );
      });
  }

  ngOnDestroy(): void {
    this.socket.complete();
  }

  getDescription(symbol: string): Observable<string> {
    const url = `${environment.finnhubBaseUrl}/${this.apiRoutes.symbolSearch}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('q', symbol);

    if (this.descriptionCache.has(symbol)) {
      return of(<string>this.descriptionCache.get(symbol));
    }

    return this.http.get<{ result: { symbol: string, description: string }[] }>(url, { params: params })
      .pipe(
        map(o => o.result),
        concatMap(x => x),
        filter(o => o.symbol === symbol),
        tap(o => this.descriptionCache.set(symbol, o.description)),
        map(o => o.description));
  }

  getQuote(symbol: string): Observable<Quote> {
    const url = `${environment.finnhubBaseUrl}/${this.apiRoutes.quote}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('symbol', symbol);

    return this.http.get<Quote>(url, { params: params });
  }

  updateRealTimeTrades(symbols: string[]): void {
    this.userTradesUpdateToken.next(symbols);
  }

  getSentiments(symbol: string, from: Date, to: Date): Observable<MonthInsiderSentiment[]> {
    const url = `${environment.finnhubBaseUrl}/${this.apiRoutes.insiderSentiment}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('symbol', symbol);
    params = params.set('from', this.getISODate(from));
    params = params.set('to', this.getISODate(to));

    return this.http.get<{ data: MonthInsiderSentiment[] }>(url, { params: params })
      .pipe(
        map(o => o.data));
  }

  private makeHttpParams(): HttpParams {
    return new HttpParams().set('token', this.token);
  }

  private getISODate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
