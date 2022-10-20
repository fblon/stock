import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';

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
  p?: number;
  v?: number;
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

  private baseUrl = 'https://finnhub.io/api/v1';
  private token = 'bu4f8kn48v6uehqi3cqg';
  private apiRoutes = {
    symbolSearch: 'search',
    quote: 'quote',
    insiderSentiment: 'stock/insider-sentiment'
  };

  private webSocketUrl = `wss://ws.finnhub.io?token=${this.token}`;
  private socket: WebSocket;
  private socketOpenedToken = new Subject();
  private _trades = new BehaviorSubject<Trade[]>([]);
  private userTradesUpdateToken = new BehaviorSubject<string[]>([]);
  private serverTradesUpdateToken = new BehaviorSubject<Trade[]>([]);

  private descriptionCache = new Map<string, string>();

  constructor(private http: HttpClient) {
    this.trades = this._trades.asObservable();
    this.socketOpenedToken.pipe(
      take(1),
      switchMap(() => combineLatest([this.userTradesUpdateToken, this.serverTradesUpdateToken]))
    )
      .subscribe(([userSymbols, serverTrades]) => {
        let currentTrades = this._trades.getValue();

        const removedSymbols = currentTrades.filter(t => !userSymbols.some(s => s === t.s)).map(t => t.s);
        const addedSymbols = userSymbols.filter(s => !currentTrades.some(t => s === t.s));
        currentTrades = currentTrades.filter(t => userSymbols.some(s => t.s === s));
        currentTrades.push(...addedSymbols.map(s => ({ s: s })));

        removedSymbols.forEach(s => {
          this.socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': s }));
        });

        addedSymbols.forEach(s =>
          this.socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': s }))
        );

        serverTrades.forEach(st => {
          const index = currentTrades.findIndex(t => t.s === st.s);
          if (index > -1) {
            currentTrades[index] = st;
          }
        });

        this._trades.next(currentTrades);
      });

    this.socket = new WebSocket(this.webSocketUrl);
    this.socket.addEventListener('open', () => this.socketOpenedToken.next({}));
    this.socket.addEventListener('message', (event) => {

      const tradeEvent: { data: Trade[], type: string } = JSON.parse(event.data);
      if (tradeEvent.type === 'trade') {
        this.serverTradesUpdateToken.next(tradeEvent.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  getDescription(symbol: string): Observable<string> {
    const url = `${this.baseUrl}/${this.apiRoutes.symbolSearch}`;
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
    const url = `${this.baseUrl}/${this.apiRoutes.quote}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('symbol', symbol);

    return this.http.get<Quote>(url, { params: params });
  }

  updateRealTimeTrades(symbols: string[]): void {
    this.userTradesUpdateToken.next(symbols);
  }

  getSentiments(symbol: string, from: Date, to: Date): Observable<MonthInsiderSentiment[]> {
    const url = `${this.baseUrl}/${this.apiRoutes.insiderSentiment}`;
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
