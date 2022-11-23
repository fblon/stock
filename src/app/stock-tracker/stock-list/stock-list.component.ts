import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../stock';

@Component({
  selector: 'app-stock-list',
  template: `
    <ul *ngIf="stocks.length > 0" class="list-group" data-cy='stock-list'>
      <li class="container border list-group-item" *ngFor="let stock of stocks">
        <app-stock-summary [stock]="stock" (deleteStockEvent)="deleteStock(stock)"></app-stock-summary>
      </li>
    </ul>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockListComponent {
  @Input() stocks!: Stock[];
  @Output() deleteStockEvent = new EventEmitter<Stock>();

  deleteStock(stock: Stock) {
    this.deleteStockEvent.emit(stock);
  }
}
