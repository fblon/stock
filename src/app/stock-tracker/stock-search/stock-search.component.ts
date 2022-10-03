import { Component, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Stock } from '../stock';
import { StockTrackerStorageService } from '../stock-tracker-storage.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-search',
  template: `
    <div class="container border">
      <br>
      <form #trackerForm="ngForm" (ngSubmit)="trackStock()">
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
                  type="submit" 
                  class="btn"
                  id="trackBtn"
                  [disabled]="!trackerForm.form.valid">Track Stock</button>
              </td>
            </tr>
          </table>
        </div>
      </form>
      <p *ngIf="isSearching" class="container fst-italic">Searching...</p>
      <p *ngIf="alreadyTrackedMessage" class="alert alert-warning">{{ alreadyTrackedMessage }}</p>
      <p *ngIf="doesNotExistMessage" class="alert alert-danger">{{ doesNotExistMessage }}</p>
      <br>
    </div>
`,
})
export class StockSearchComponent {
  @Output() addStockEvent = new EventEmitter<Stock>();

  private _stockInput: string = '';
  get stockInput(): string {
    return this._stockInput;
  }

  set stockInput(value: string) {
    this.resetIndicators();
    this._stockInput = value;
  }

  isSearching: boolean = false;
  alreadyTrackedMessage: string = '';
  doesNotExistMessage: string = '';

  constructor(
    private storageService: StockTrackerStorageService,
    private stockService: StockService) { }

  trackStock(): void {
    this.resetIndicators();
    const sanitizedInput = this.stockInput.trim().toUpperCase();

    if (this.storageService.isStored(sanitizedInput)) {
      this.alreadyTrackedMessage = `Stock is already being tracked: ${sanitizedInput}`;
      return;
    }

    this.isSearching = true;

    this.stockService.getStock(sanitizedInput)
      .pipe(finalize(() => this.isSearching = false))
      .subscribe((stock) => {
        if (stock === undefined) {
          this.doesNotExistMessage = `Stock does NOT exist: ${sanitizedInput}`;
          return;
        }

        this.addStockEvent.emit(stock);

        this.stockInput = '';
      })
  }

  private resetIndicators() {
    this.alreadyTrackedMessage = '';
    this.doesNotExistMessage = '';
    this.isSearching = false;
  }

}
