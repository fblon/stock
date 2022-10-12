import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentimentDetails } from './sentiment-details';

@Component({
  template: `
    <br>
    <div *ngIf="sentimentDetails" class="container border">
      <table class="table">
        <tr><td><h5>{{ sentimentDetails | stockTitle }}</h5></td></tr>
        <tr class="row">
          <td class="col">
            <app-month-sentiment [monthSentiment]="sentimentDetails.twoMonthsAgoSentiment"></app-month-sentiment>
          </td>
          <td class="col">
            <app-month-sentiment [monthSentiment]="sentimentDetails.oneMonthAgoSentiment"></app-month-sentiment>
          </td>
          <td class="col">
            <app-month-sentiment [monthSentiment]="sentimentDetails.currentMonthSentiment"></app-month-sentiment>
          </td>
        </tr>
      </table>
    </div>
    <br>
    <div class="container">
      <a [routerLink]="['/']" 
        class="btn btn-outline-secondary" 
        id="backBtn">
        < Back to list of stocks
      </a>
    </div>
  `
})
export class SentimentDetailsComponent implements OnInit {

  sentimentDetails!: SentimentDetails;
  stockNotFound = '';

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sentimentDetails = this.route.snapshot.data["sentimentDetails"];
  }

}
