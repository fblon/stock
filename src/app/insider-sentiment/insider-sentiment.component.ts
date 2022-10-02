import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Sentiment } from './sentiment';
import { SentimentService } from './sentiment.service';

@Component({
  selector: 'app-insider-sentiment',
  template: `
    <br>
    <p *ngIf="!sentiment" class="container fst-italic">Loading sentiment...</p>
    <div *ngIf="sentiment" class="container border">
      <table class="table">
        <tr><td><h5>{{ sentiment | stockTitle }}</h5></td></tr>
        <tr class="row">
          <td *ngIf="sentiment.twoMonthsAgoSentiment" class="col">
            <app-month-sentiment [monthSentiment]="sentiment.twoMonthsAgoSentiment"></app-month-sentiment>
          </td>
          <td *ngIf="sentiment.oneMonthAgoSentiment" class="col">
            <app-month-sentiment [monthSentiment]="sentiment.oneMonthAgoSentiment"></app-month-sentiment>
          </td>
          <td *ngIf="sentiment.currentMonthSentiment" class="col">
            <app-month-sentiment [monthSentiment]="sentiment.currentMonthSentiment"></app-month-sentiment>
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
export class InsiderSentimentComponent implements OnInit {

  sentiment!: Sentiment;
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private sentimentService: SentimentService) { }

  ngOnInit(): void {

    this.isLoading = true;
    const symbol = this.route.snapshot.params["symbol"];

    this.sentimentService.getSentiment(symbol)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((s) => {
        if (s) {
          this.sentiment = s;
        }
        // TODO: handle undefined sentiment

      });
  }

}
