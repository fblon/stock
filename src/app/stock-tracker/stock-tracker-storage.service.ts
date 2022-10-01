import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerStorageService {

  private static readonly storageKey = "stockSymbols";

  constructor() { }

  getAllSymbols() : string[] {
    const jsonStorage = localStorage.getItem(StockTrackerStorageService.storageKey);
    return jsonStorage ? JSON.parse(jsonStorage) : [];
  }

  saveSymbol(stockSymbol: string): void {
    const symbols = this.getAllSymbols();

    if (!symbols.includes(stockSymbol)) {
      symbols.push(stockSymbol);
    }

    const jsonSymbols = JSON.stringify(symbols);
    localStorage.setItem(StockTrackerStorageService.storageKey, jsonSymbols);
  }
}
