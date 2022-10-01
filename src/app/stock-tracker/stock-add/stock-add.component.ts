import { Component, OnInit } from '@angular/core';
import { StockTrackerStorageService } from '../stock-tracker-storage.service';

@Component({
  selector: 'app-stock-add',
  template: `
  <form #trackerForm="ngForm">
    <div class="form-group">
      <div>Enter the symbol of a stock to track (i.e. AAPL, TSLA, GOOGL)</div>
      <span>
        <input 
          required
          type="text" 
          class="form-control" 
          id="stockInput"
          name="stockInput"
          [(ngModel)]="stockInput"></span>
      <span>
        <button 
          type="button" 
          class="btn btn-default"
          id="trackBtn"
          (click)="trackStock()"
          [disabled]="!trackerForm.form.valid">Track Stock</button>
      </span>
    </div>
  </form>  
`,
})
export class StockAddComponent implements OnInit {

  stockInput: string = '';

  constructor(private storageService: StockTrackerStorageService) { }

  ngOnInit(): void {
  }

  trackStock(): void {
    this.storageService.saveSymbol(this.stockInput);

    console.log(this.storageService.getAllSymbols());

  }

}
