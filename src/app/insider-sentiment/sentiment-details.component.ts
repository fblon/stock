import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SentimentDetails } from './sentiment-details';
import { SentimentDetailsService } from './sentiment-details.service';

@Component({
  template: `
    <br>
    <p *ngIf="!sentimentDetails" class="container fst-italic">Loading sentiment details...</p>
    <div *ngIf="sentimentDetails" class="container border">
      <table class="table">
        <tr><td><h5>{{ sentimentDetails | stockTitle }}</h5></td></tr>
        <tr class="row">
          <td *ngIf="sentimentDetails.twoMonthsAgoSentiment" class="col">
            <app-month-sentiment [monthSentiment]="sentimentDetails.twoMonthsAgoSentiment"></app-month-sentiment>
          </td>
          <td *ngIf="sentimentDetails.oneMonthAgoSentiment" class="col">
            <app-month-sentiment [monthSentiment]="sentimentDetails.oneMonthAgoSentiment"></app-month-sentiment>
          </td>
          <td *ngIf="sentimentDetails.currentMonthSentiment" class="col">
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
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private sentimentService: SentimentDetailsService) { }

  ngOnInit(): void {

    this.isLoading = true;
    const symbol = this.route.snapshot.params["symbol"];

    this.sentimentService.getSentiment(symbol)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((s) => {
        if (s) {
          this.sentimentDetails = s;
        }
        // TODO: handle undefined sentiment

      });
  }

}
