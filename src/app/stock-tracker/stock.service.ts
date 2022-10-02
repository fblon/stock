import { Injectable } from '@angular/core';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  getStock(symbol: string) : Stock | undefined {
    const stock: Stock = {
      symbol: symbol,
      description: `DESC ${symbol}`,
      currentPrice: 1562,
      openingPriceOfTheDay: 1400,
      highPriceOfTheDay: 1750,
      percentChange: 5.6,
    }

    return stock;
  }

  getStocks(symbols: string[]) : Stock[] {
    return symbols.map(s => <Stock>this.getStock(s));
  }
}
