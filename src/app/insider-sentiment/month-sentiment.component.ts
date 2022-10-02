import { Component, Input } from '@angular/core';
import { MonthSentiment } from './sentiment';

@Component({
  selector: 'app-month-sentiment',
  template: `
    <table class="table">
      <tr>
        <td class="col-md-6">
          <table class="table">
            <tr><td>{{ monthSentiment.monthDate | date:'MMMM' | uppercase }}</td></tr>
            <tr><td>Change: {{ monthSentiment.change > 0 ? '+' : '' }}{{ monthSentiment.change }} </td></tr>
            <tr><td>MSPR: {{ monthSentiment.mspr | number:'1.0-2' }} </td></tr>
          </table>
        </td>
        <td>
          <app-trend [percentage]="monthSentiment.change"></app-trend>
        </td>
      </tr>
    </table>
  `
})
export class MonthSentimentComponent {

  @Input() monthSentiment!: MonthSentiment

}
