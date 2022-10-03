import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentimentDetails } from './sentiment-details';
import { SentimentDetailsService } from './sentiment-details.service';

@Component({
  template: `
    <br>
    <p *ngIf="!sentimentDetails && !stockNotFound" class="container fst-italic">Loading sentiment details...</p>
    <p *ngIf="stockNotFound" class="alert alert-danger">Stock not found: {{ stockNotFound }}</p>
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
  stockNotFound: string = '';

  constructor(
    private route: ActivatedRoute,
    private sentimentService: SentimentDetailsService) { }

  ngOnInit(): void {

    const symbol = this.route.snapshot.params["symbol"].toUpperCase();

    this.sentimentService.getSentiment(symbol)
      .subscribe((s) => {
        if (s) {
          this.sentimentDetails = s;
        }
        else {
          this.stockNotFound = symbol;
        }
      });
  }

}
