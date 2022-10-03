import { Component, Input } from '@angular/core';
import { MonthSentiment } from './sentiment-details';

@Component({
  selector: 'app-month-sentiment',
  template: `
    <table class="table">
      <tr>
        <td class="col-md-6">
          <table class="table">
            <tr><td class="fw-bold">{{ monthSentiment.monthDate | date:'MMMM' | uppercase }}</td></tr>

            <tr *ngIf="monthSentiment.details"><td>Change: {{ monthSentiment.details.change > 0 ? '+' : '' }}{{ monthSentiment.details.change }} </td></tr>
            <tr *ngIf="monthSentiment.details"><td>MSPR: {{ monthSentiment.details.mspr | number:'1.0-2' }} </td></tr>

            <tr *ngIf="!monthSentiment.details" class="text-muted"><td>No data available</td></tr>
          </table>
        </td>
        <td *ngIf="monthSentiment.details">
          <app-trend [percentage]="monthSentiment.details.change"></app-trend>
        </td>
      </tr>
    </table>
  `
})
export class MonthSentimentComponent {

  @Input() monthSentiment!: MonthSentiment

}
