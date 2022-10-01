import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StockTrackerStorageService } from '../stock-tracker-storage.service';

@Component({
  selector: 'app-stock-add',
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
export class StockAddComponent implements OnInit {
  @Output() addStockSymbol = new EventEmitter<string>();

  stockInput: string = '';

  constructor(private storageService: StockTrackerStorageService) { }

  ngOnInit(): void {
  }

  trackStock(): void {
    if (this.storageService.addStockSymbol(this.stockInput)) {
      this.addStockSymbol.emit(this.stockInput);
    }
  }

}
