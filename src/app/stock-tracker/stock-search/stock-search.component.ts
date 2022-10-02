import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stock } from '../stock';
import { StockTrackerStorageService } from '../stock-tracker-storage.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-search',
  template: `
    <div class="container border">
      <br>
      <form #trackerForm="ngForm">
        <div>Enter the symbol of a stock to track (i.e. AAPL, TSLA, GOOGL)</div>
        <br>
        <div class="form-group col-md-3">
          <table class="table">
            <tr>
              <td>
                <input 
                  required
                  type="text" 
                  class="form-control" 
                  id="stockInput"
                  name="stockInput"
                  [(ngModel)]="stockInput"></td>
              <td>
                <button 
                  type="button" 
                  class="btn"
                  id="trackBtn"
                  (click)="trackStock()"
                  [disabled]="!trackerForm.form.valid">Track Stock</button>
              </td>
            </tr>
          </table>
        </div>
      </form>
      <br>
    </div>
`,
})
export class StockSearchComponent implements OnInit {
  @Output() addStockEvent = new EventEmitter<Stock>();

  stockInput: string = '';

  constructor(
    private storageService: StockTrackerStorageService,
    private stockService: StockService) { }

  ngOnInit(): void {
  }

  trackStock(): void {
    if (this.storageService.isStored(this.stockInput)) {
      // TODO: display already stored
      return;
    }

    this.stockService.getStock(this.stockInput).subscribe((stock) => {
      if (stock === undefined) {
        // TODO display error if not exists
        return;
      }

      this.storageService.addStockSymbol(stock.symbol);
      this.addStockEvent.emit(stock);
    })
  }

}
