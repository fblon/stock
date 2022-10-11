import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Stock } from "./stock";
import { StockTrackerStorageService } from "./stock-tracker-storage.service";
import { StockService } from "./stock.service";

@Component({
  template: `
    <app-stock-search (addStockEvent)="addStock($event)"></app-stock-search>
    <app-stock-list *ngIf="stocks | async as asyncStocks" [stocks]="asyncStocks" (deleteStockEvent)="deleteStock($event)"></app-stock-list>`
})
export class StockTrackerComponent implements OnInit {
  stocks: Observable<Stock[]> = EMPTY;

  private refreshToken = new BehaviorSubject(undefined);

  constructor(
    private storageService: StockTrackerStorageService,
    private stockService: StockService) {
  }

  ngOnInit(): void {

    this.stocks = this.refreshToken.pipe(
      switchMap(() => this.getStocks()));
  }

  addStock(stock: Stock) {
    this.storageService.addStockSymbol(stock.symbol);
    this.refreshToken.next(undefined);
  }

  deleteStock(stock: Stock) {
    this.storageService.deleteStock(stock.symbol);
    this.refreshToken.next(undefined);
  }

  private getStocks() : Observable<Stock[]> {
    const allSymbols = this.storageService.getAllStockSymbols();
    return this.stockService.getStocks(allSymbols);
  }
}
