import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerStorageService {

  private static readonly storageKey = "stockSymbols";

  constructor() { }

  addStockSymbol(symbol: string): boolean {
    const allSymbols = this.getAllStockSymbols();
    const existing = allSymbols.includes(symbol); 

    if (!existing) {
      allSymbols.push(symbol);
    }

    this.saveAllStockSymbols(allSymbols);

    console.log(allSymbols);
    return !existing;
  }

  deleteStockSymbol(symbol: string): void {
    let allSymbols = this.getAllStockSymbols();
    allSymbols = allSymbols.filter(s => s !== symbol);

    this.saveAllStockSymbols(allSymbols);
  }

  private getAllStockSymbols(): string[] {
    const jsonStorage = localStorage.getItem(StockTrackerStorageService.storageKey);
    return jsonStorage ? JSON.parse(jsonStorage) : [];
  }

  private saveAllStockSymbols(symbols: string[]) {
    const jsonSymbols = JSON.stringify(symbols);
    localStorage.setItem(StockTrackerStorageService.storageKey, jsonSymbols);
  }
}
