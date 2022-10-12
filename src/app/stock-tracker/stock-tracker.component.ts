import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, merge, Observable, Subject, timer } from 'rxjs';
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

  private refreshRate = 30000;
  private refreshToken = new Subject();
  private autoRefreshToken = timer(this.refreshRate, this.refreshRate);

  constructor(
    private route: ActivatedRoute,
    private storageService: StockTrackerStorageService,
    private stockService: StockService) {
  }

  ngOnInit(): void {

    const initialStocks = this.route.snapshot.data['stocks'];
    const refreshedStocks = merge(this.autoRefreshToken, this.refreshToken)
      .pipe(
        switchMap(() => this.getStocks()));

    this.stocks = refreshedStocks.pipe(
      startWith(initialStocks));
  }

  addStock(stock: Stock) {
    this.storageService.addStockSymbol(stock.symbol);
    this.refreshToken.next(undefined);
  }

  deleteStock(stock: Stock) {
    this.storageService.deleteStock(stock.symbol);
    this.refreshToken.next(undefined);
  }

  private getStocks(): Observable<Stock[]> {
    const allSymbols = this.storageService.getAllStockSymbols();
    return this.stockService.getStocks(allSymbols);
  }
}
