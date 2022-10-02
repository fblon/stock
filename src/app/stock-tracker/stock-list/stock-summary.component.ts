import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../stock';

// TODO: add HTML Id to the x button
@Component({
  selector: 'app-stock-summary',
  template: `
    <div>
      <table class="table">
        <tr>
          <td>
            <h5>{{ stock.description }} ({{ stock.symbol }})</h5>
          </td>
          <td>
            <button class="btn btn-light shadow-none" style="float: right !important" 
              (click)="delete()">
              X
            </button>
          </td>
        </tr>
      </table>
      <table class="table">
        <tr>
          <td class="w-50">
            <table class="table">
              <tr>
                <td>
                  <span>Change today: </span>
                  <span>{{ stock.percentChange | percent:'1.0-2' }}</span>
                </td>
                <td>
                  <span>Opening price: </span>
                  <span>{{ stock.openingPriceOfTheDay | currency }}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Current price: </span>
                  <span>{{ stock.currentPrice | currency }}</span>
                </td>
                <td>
                  <span>High price: </span>
                  <span>{{ stock.highPriceOfTheDay | currency }}</span>
                </td>
              </tr>
            </table>
          </td>
          <td class="w-50">
            <app-trend [percentage]="stock.percentChange"></app-trend>
          </td>
        </tr>
      </table>
    </div>
  `
})
export class StockSummaryComponent {

  @Input() stock!: Stock;
  @Output() deleteStockEvent = new EventEmitter();

  constructor() { }

  delete() {
    this.deleteStockEvent.emit()

  }
}
