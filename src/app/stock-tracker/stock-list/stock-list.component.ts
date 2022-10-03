import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../stock';

@Component({
  selector: 'app-stock-list',
  template: `
    <ul class="list-group">
      <li class="container border list-group-item" *ngFor="let stock of stocks">
        <app-stock-summary [stock]="stock" (deleteStockEvent)="deleteStock(stock)"></app-stock-summary>
      </li>
    </ul>  
  `
})
export class StockListComponent {
  private _stocks: Stock[] = [];
  
  @Input() set stocks(value: Stock[]) {
    this._stocks = value;
  }

  get stocks() {
    return this._stocks;
  }

  @Output() deleteStockEvent = new EventEmitter<Stock>();

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  deleteStock(stock: Stock) {
    this.stocks = this.stocks.filter(s => s !== stock);
    this.deleteStockEvent.emit(stock);
  }
}
