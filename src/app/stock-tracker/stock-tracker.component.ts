import { Component, ViewChild } from "@angular/core";
import { Stock } from "./stock";
import { StockListComponent } from "./stock-list/stock-list.component";

@Component({
  template: `
    <app-stock-search (addStockEvent)="addStock($event)"></app-stock-search>
    <br>
    <app-stock-list #stockList></app-stock-list>`
})
export class StockTrackerComponent {

  @ViewChild(StockListComponent) stockList!: StockListComponent;

  addStock(stock: Stock) {
    this.stockList.addStock(stock);
  }
}
