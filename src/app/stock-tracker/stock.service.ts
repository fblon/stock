import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { defaultIfEmpty, map, startWith } from 'rxjs/operators';
import { FinnhubService } from '../core/finnhub.service';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private finnhubService: FinnhubService) { }

  getStock(symbol: string): Observable<Stock | undefined> {

    return forkJoin({
      description: this.finnhubService.getDescription(symbol),
      quote: this.finnhubService.getQuote(symbol)
    })
      .pipe(
        map(o => {
          const stock: Stock = {
            symbol: symbol,
            description: o.description,
            currentPrice: o.quote.c,
            openingPriceOfTheDay: o.quote.o,
            highPriceOfTheDay: o.quote.h,
            percentChange: (o.quote.dp / 100),
          };

          return stock;
        }),
        defaultIfEmpty(undefined));
  }

  getStocks(symbols: string[]): Observable<Stock[]> {
    if (symbols.length === 0) {
      return of([]);
    }

    return forkJoin(
      symbols.map(s => this.getStock(s)
        .pipe(map(o => <Stock>o))));
  }

  getRealTimeStocks(symbols: string[]): Observable<Stock[]> {
    this.finnhubService.updateRealTimeTrades(symbols);

    return combineLatest([this.getStocks(symbols), this.finnhubService.trades.pipe(startWith([]))])
      .pipe(
        map(([stocks, trades]) => {
          trades.forEach(t => {
            const index = stocks.findIndex(s => s.symbol === t.s);

            if (index > -1) {
              stocks[index].currentPrice = t.p;
              stocks[index].highPriceOfTheDay = Math.max(stocks[index].highPriceOfTheDay, stocks[index].currentPrice);
            }
          });

          return stocks;
        }));
  }
}
