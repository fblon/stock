import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { FinnhubService } from '../core/finnhub.service';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private finnhubService: FinnhubService) { }

  getStock(symbol: string): Observable<Stock | undefined> {

    return forkJoin([
      this.finnhubService.getDescription(symbol).pipe(catchError(() => of(undefined))),
      this.finnhubService.getQuote(symbol).pipe(
        catchError(() => of(
          {
            c: Number.NaN,
            o: Number.NaN,
            h: Number.NaN,
            dp: Number.NaN
          }
        )))
    ])
      .pipe(
        map(([description, quote]) => {
          if (!description) {
            return undefined;
          }

          const stock: Stock = {
            symbol: symbol,
            description: description,
            currentPrice: quote.c,
            openingPriceOfTheDay: quote.o,
            highPriceOfTheDay: quote.h,
            percentChange: (quote.dp / 100),
          };

          return stock;
        }));
  }

  getStocks(symbols: string[]): Observable<Stock[]> {
    if (symbols.length === 0) {
      return of([]);
    }

    return forkJoin(symbols.map(s => this.getStock(s)))
      .pipe(
        map(stocks => stocks.filter(s => s != null).map(s => s as Stock)));
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
