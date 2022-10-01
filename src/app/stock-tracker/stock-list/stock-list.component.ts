import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../stock';
import { StockTrackerStorageService } from '../stock-tracker-storage.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: 'stock-list.component.html'
})
export class StockListComponent implements OnInit {

  stocks = new BehaviorSubject<Stock[]>([]);

  constructor(private storageService: StockTrackerStorageService) { }

  ngOnInit(): void {
  }

  addStockSymbol(symbol: string) {
    this.stocks.next([...this.stocks.getValue(), {
      name: symbol,
      currentPrice: 1562,
      openingPriceOfTheDay: 1400,
      highPriceOfTheDay: 1750,
      percentChange: 5.6,
      percentChangeSign: '-'
    }]);
  }

  deleteStock(stock: Stock) {
    this.storageService.deleteStockSymbol(stock.name);

    this.stocks.next(this.stocks.getValue().filter(s => s.name !== stock.name));
  }
}
