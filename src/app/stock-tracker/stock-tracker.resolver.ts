import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from './stock';
import { StockTrackerStorageService } from './stock-tracker-storage.service';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerResolver implements Resolve<Stock[]> {
  constructor(
    private storageService: StockTrackerStorageService,
    private stockService: StockService) {
  }

  resolve(): Observable<Stock[]> {
    const allSymbols = this.storageService.getAllStockSymbols();
    return this.stockService.getStocks(allSymbols);
  }
}
