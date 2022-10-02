import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, defaultIfEmpty, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  private baseUrl = 'https://finnhub.io/api/v1';
  private token = 'bu4f8kn48v6uehqi3cqg';
  private apiRoutes = {
    symbolSearch: 'search',
    quote: 'quote'
  }

  constructor(private http: HttpClient) { }

  getDescription(symbol: string): Observable<string | undefined> {
    let url = `${this.baseUrl}/${this.apiRoutes.symbolSearch}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('q', symbol);

    return this.http.get<{ result: {symbol: string, description: string }[] }>(url, { params: params })
      .pipe(
        map(o => o.result),
        concatMap(x => x),
        filter(o => o.symbol === symbol),
        map(o => o.description),
        defaultIfEmpty(undefined));
  }

  private makeHttpParams(): HttpParams {
    return new HttpParams().set('token', this.token);
  }
}
