import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../stock';
import { StockTrackerStorageService } from '../stock-tracker-storage.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  template: `
    <ul class="list-group">
      <li class="container border list-group-item" *ngFor="let stock of stocks | async">
        <app-stock-summary [stock]="stock" (deleteStockEvent)="deleteStock(stock)"></app-stock-summary>
      </li>
    </ul>  
  `
})
export class StockListComponent implements OnInit {

  stocks = new BehaviorSubject<Stock[]>([]);

  constructor(
    private storageService: StockTrackerStorageService,
    private stockService: StockService) { }

  ngOnInit(): void {
    const allSymbols = this.storageService.getAllStockSymbols();

    this.stockService.getStocks(allSymbols).subscribe((allStocks) => {
      this.stocks.next(allStocks);
    })
  }

  addStock(stock: Stock) {
    this.stocks.next([...this.stocks.getValue(), stock]);
  }

  deleteStock(stock: Stock) {
    this.storageService.deleteStock(stock.symbol);

    this.stocks.next(this.stocks.getValue().filter(s => s.symbol !== stock.symbol));
  }
}
