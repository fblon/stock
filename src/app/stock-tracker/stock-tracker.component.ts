import { Component, ViewChild } from "@angular/core";
import { StockListComponent } from "./stock-list/stock-list.component";

@Component({
  template: `
    <app-stock-add (addStockSymbol)="addStockSymbol($event)"></app-stock-add>
    <br>
    <app-stock-list #stockList></app-stock-list>`
})
export class StockTrackerComponent {

  @ViewChild(StockListComponent) stockList!: StockListComponent;

  addStockSymbol(symbol: string) {
    this.stockList.addStockSymbol(symbol);    
  }
}
