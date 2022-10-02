import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, filter, map, Observable, of } from 'rxjs';

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
  private httpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    });

  constructor(private http: HttpClient) { }

  getDescription(symbol: string): Observable<string> {
    let url = `${this.baseUrl}/${this.apiRoutes.symbolSearch}`;
    let params: HttpParams = this.makeHttpParams();
    params = params.set('q', symbol);

    return this.http.get<{ result: {symbol: string, description: string }[] }>(url, { params: params, headers: this.httpHeaders })
    //return this.fakeContent
      .pipe(
        map(o => o.result),
        concatMap(x => x),
        filter(o => o.symbol === symbol),
        map(o => o.description));
  }

  private makeHttpParams(): HttpParams {
    return new HttpParams().set('token', this.token);
  }

  private fakeContent =
    of(
      { "result": 
      [{"description":"APPLE INC","displaySymbol":"AAPL","symbol":"AAPL","type":"Common Stock"},{"description":"APPLE INC","displaySymbol":"AAPL.VI","symbol":"AAPL.VI","type":"Common Stock"},{"description":"APPLE INC","displaySymbol":"AAPL.BC","symbol":"AAPL.BC","type":"Common Stock"},{"description":"APPLE INC","displaySymbol":"AAPL.MI","symbol":"AAPL.MI","type":"Common Stock"},{"description":"LS 1X AAPL","displaySymbol":"AAPL.AS","symbol":"AAPL.AS","type":"ETP"},{"description":"APPLE INC-CDR","displaySymbol":"AAPL.NE","symbol":"AAPL.NE","type":"Receipt"},{"description":"APPLE INC","displaySymbol":"AAPL.SW","symbol":"AAPL.SW","type":"Common Stock"},{"description":"APPLE INC","displaySymbol":"AAPL.SN","symbol":"AAPL.SN","type":"Common Stock"},{"description":"APPLE INC","displaySymbol":"AAPL.MX","symbol":"AAPL.MX","type":"Common Stock"},{"description":"LS 1X AAPL","displaySymbol":"AAPL.L","symbol":"AAPL.L","type":"ETP"},{"description":"SAGA PLC","displaySymbol":"SGPLF","symbol":"SGPLF","type":"Common Stock"},{"description":"Harvia Plc","displaySymbol":"0ABF.L","symbol":"0ABF.L","type":""},{"description":"Aviva Plc","displaySymbol":"A2RT8J.MU","symbol":"A2RT8J.MU","type":""},{"description":"Aviva Plc","displaySymbol":"GU8G.DU","symbol":"GU8G.DU","type":""},{"description":"Aviva Plc","displaySymbol":"A1HNBA.MU","symbol":"A1HNBA.MU","type":""},{"description":"Aviva Plc","displaySymbol":"GU8G.BE","symbol":"GU8G.BE","type":""},{"description":"Aviva Plc","displaySymbol":"A28X36.DU","symbol":"A28X36.DU","type":""},{"description":"Aviva Plc","displaySymbol":"A2RT8J.BE","symbol":"A2RT8J.BE","type":""},{"description":"Valaris plc","displaySymbol":"0A1P.L","symbol":"0A1P.L","type":""},{"description":"Aviva Plc","displaySymbol":"A2RT8J.DU","symbol":"A2RT8J.DU","type":""},{"description":"Aviva Plc","displaySymbol":"A1HNBA.DU","symbol":"A1HNBA.DU","type":""},{"description":"Aviva Plc","displaySymbol":"GU8G.MU","symbol":"GU8G.MU","type":""},{"description":"Assura plc","displaySymbol":"A193K2.BE","symbol":"A193K2.BE","type":""},{"description":"SAGA PLC","displaySymbol":"65J.F","symbol":"65J.F","type":"Common Stock"},{"description":"XAAR PLC","displaySymbol":"XAR.F","symbol":"XAR.F","type":"Common Stock"},{"description":"Barclays plc","displaySymbol":"A190ZP.MU","symbol":"A190ZP.MU","type":""},{"description":"SAGA PLC","displaySymbol":"SAGA.L","symbol":"SAGA.L","type":"Common Stock"},{"description":"SAGA PLC","displaySymbol":"65J.BE","symbol":"65J.BE","type":"Common Stock"},{"description":"Barclays plc","displaySymbol":"A190ZN.BE","symbol":"A190ZN.BE","type":""},{"description":"XAAR PLC","displaySymbol":"XAR.L","symbol":"XAR.L","type":"Common Stock"},{"description":"ARENA PL","displaySymbol":"ARE.WA","symbol":"ARE.WA","type":"Common Stock"},{"description":"ARENA PL","displaySymbol":"8G6.F","symbol":"8G6.F","type":"Common Stock"}]
    }
    );
}
