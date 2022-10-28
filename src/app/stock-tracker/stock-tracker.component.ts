import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Stock } from './stock';
import { StockTrackerStorageService } from './stock-tracker-storage.service';
import { StockService } from './stock.service';

@Component({
  template: `
    <app-stock-search (addStockEvent)="addStock($event)"></app-stock-search>
    <app-stock-list *ngIf="(stocks | async) as asyncStocks" [stocks]="asyncStocks" (deleteStockEvent)="deleteStock($event)"></app-stock-list>`
})
export class StockTrackerComponent implements OnInit {
  stocks: Observable<Stock[]> = EMPTY;

  private refreshToken = new Subject();

  constructor(
    private route: ActivatedRoute,
    private storageService: StockTrackerStorageService,
    private stockService: StockService) {
  }

  ngOnInit(): void {

    const initialStocks = this.route.snapshot.data['stocks'];
    this.stocks = this.refreshToken.pipe(
      switchMap(() => this.getStocks()),
      startWith(initialStocks));
  }

  addStock(stock: Stock) {
    this.storageService.addStockSymbol(stock.symbol);
    this.refreshToken.next({});
  }

  deleteStock(stock: Stock) {
    this.storageService.deleteStock(stock.symbol);
    this.refreshToken.next({});
  }

  private getStocks(): Observable<Stock[]> {
    const allSymbols = this.storageService.getAllStockSymbols();
    return this.stockService.getRealTimeStocks(allSymbols);
  }
}
