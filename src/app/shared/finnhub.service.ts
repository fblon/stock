import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, filter, map, Observable } from 'rxjs';

export interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface MonthInsiderSentiment {
  change: number;
  month: number;
  year: number;
  mspr: number;
}

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  private baseUrl = 'https://finnhub.io/api/v1';
  private token = 'bu4f8kn48v6uehqi3cqg';
  private apiRoutes = {
    symbolSearch: 'search',
    quote: 'quote',
    insiderSentiment: 'stock/insider-sentiment'
  }

  constructor(private http: HttpClient) { }

  // TODO: cache
  getDescription(symbol: string): Observable<string> {
    const url = `${this.baseUrl}/${this.apiRoutes.symbolSearch}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('q', symbol);

    return this.http.get<{ result: { symbol: string, description: string }[] }>(url, { params: params })
      .pipe(
        map(o => o.result),
        concatMap(x => x),
        filter(o => o.symbol === symbol),
        map(o => o.description));
  }

  getQuote(symbol: string): Observable<Quote> {
    const url = `${this.baseUrl}/${this.apiRoutes.quote}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('symbol', symbol);

    return this.http.get<Quote>(url, { params: params });
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
