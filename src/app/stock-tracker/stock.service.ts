import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { FinnhubService } from '../shared/finnhub.service';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private finnhubService: FinnhubService) { }

  getStock(symbol: string): Observable<Stock | undefined> {

    return this.finnhubService.getDescription(symbol)
      .pipe(
        map(desc => {
          return !!desc ? {
            symbol: symbol,
            description: desc,
            currentPrice: 1562,
            openingPriceOfTheDay: 1400,
            highPriceOfTheDay: 1750,
            percentChange: 5.6,
          } : undefined;
        })
    );
  }

  getStocks(symbols: string[]): Observable<Stock[]> {
    return forkJoin(
      symbols.map(s => this.getStock(s)
        .pipe(map(o => <Stock>o))));
  }
}
