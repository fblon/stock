import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FinnhubService, MonthInsiderSentiment } from '../core/finnhub.service';
import { MonthSentiment, SentimentDetails } from './sentiment-details';

@Injectable({
  providedIn: 'root'
})
export class SentimentDetailsService {

  constructor(private finnhubService: FinnhubService) { }

  getSentiment(symbol: string): Observable<SentimentDetails | undefined> {
    const today = this.getDate();
    const oneMonthAgo = this.getDate(1);
    const twoMonthsAgo = this.getDate(2);
    const threeMonthsAgo = this.getDate(3);

    return forkJoin([
      this.finnhubService.getDescription(symbol).pipe(catchError(() => of(undefined))),
      this.finnhubService.getSentiments(symbol, threeMonthsAgo, today).pipe(catchError(() => of([])))
    ])
      .pipe(
        map(([description, sentiments]) => {
          if (!description) {
            return undefined;
          }

          return {
            symbol: symbol,
            description: description,
            currentMonthSentiment: this.getMonthSentiment(today, sentiments),
            oneMonthAgoSentiment: this.getMonthSentiment(oneMonthAgo, sentiments),
            twoMonthsAgoSentiment: this.getMonthSentiment(twoMonthsAgo, sentiments)
          };
        })
      );
  }

  private getMonthSentiment(date: Date, sentiments: MonthInsiderSentiment[]): MonthSentiment {
    const matchingSentiment = sentiments.find(s => s.month === date.getMonth() && s.year === date.getFullYear());

    const monthSentiment: MonthSentiment = {
      monthDate: date,
      details: matchingSentiment ? {
        change: matchingSentiment.change,
        mspr: matchingSentiment.mspr
      } : undefined
    };

    return monthSentiment;
  }

  private getDate(numberOfMonthsAgo = 0): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - numberOfMonthsAgo);
    return date;
  }
}
