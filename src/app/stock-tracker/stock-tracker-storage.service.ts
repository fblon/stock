import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerStorageService {

  private static readonly storageKey = 'stockSymbols';

  getAllStockSymbols(): string[] {
    const jsonStorage = localStorage.getItem(StockTrackerStorageService.storageKey);
    return jsonStorage ? JSON.parse(jsonStorage) : [];
  }

  isStored(symbol: string) {
    const allSymbols = this.getAllStockSymbols();
    return allSymbols.includes(symbol);
  }

  addStockSymbol(symbol: string): void {
    const allStockSymbols = this.getAllStockSymbols();
    allStockSymbols.push(symbol);

    this.saveAllStockSymbols(allStockSymbols);
  }

  deleteStock(symbol: string): void {
    let allSymbols = this.getAllStockSymbols();
    allSymbols = allSymbols.filter(s => s !== symbol);

    this.saveAllStockSymbols(allSymbols);
  }

  private saveAllStockSymbols(symbols: string[]) {
    const jsonStorage = JSON.stringify(symbols);
    localStorage.setItem(StockTrackerStorageService.storageKey, jsonStorage);
  }
}
