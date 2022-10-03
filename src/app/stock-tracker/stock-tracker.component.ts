import { Component, OnInit, ViewChild } from "@angular/core";
import { finalize } from "rxjs/operators";
import { Stock } from "./stock";
import { StockListComponent } from "./stock-list/stock-list.component";
import { StockTrackerStorageService } from "./stock-tracker-storage.service";
import { StockService } from "./stock.service";

@Component({
  template: `
    <app-stock-search (addStockEvent)="addStock($event)"></app-stock-search>
    <br>
    <p *ngIf="isLoading" class="container fst-italic">Loading stock list...</p>
    <app-stock-list (deleteStockEvent)="deleteStock($event)" #stockList></app-stock-list>`
})
export class StockTrackerComponent implements OnInit {
  @ViewChild(StockListComponent) stockList!: StockListComponent;

  isLoading!: boolean;

  constructor(
    private storageService: StockTrackerStorageService,
    private stockService: StockService) {
    }

  ngOnInit(): void {
    const allSymbols = this.storageService.getAllStockSymbols();
    this.isLoading = true;

    this.stockService.getStocks(allSymbols)
      .pipe(
        finalize(() => this.isLoading = false))
      .subscribe((allStocks) => {
        this.stockList.stocks = allStocks;
      })
  }

  addStock(stock: Stock) {
    this.storageService.addStockSymbol(stock.symbol);
    this.stockList.addStock(stock);
  }

  deleteStock(stock: Stock) {
    this.storageService.deleteStock(stock.symbol);
  }
}
