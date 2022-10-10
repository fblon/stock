import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
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

    return forkJoin({
      description: this.finnhubService.getDescription(symbol),
      sentiments: this.finnhubService.getSentiments(symbol, threeMonthsAgo, today)
    })
      .pipe(
        map(o => {
          return {
            symbol: symbol,
            description: o.description,
            currentMonthSentiment: this.getMonthSentiment(today, o.sentiments),
            oneMonthAgoSentiment: this.getMonthSentiment(oneMonthAgo, o.sentiments),
            twoMonthsAgoSentiment: this.getMonthSentiment(twoMonthsAgo, o.sentiments)
          };
        }),
        defaultIfEmpty(undefined)
      );
  }

  private getMonthSentiment(date: Date, sentiments: MonthInsiderSentiment[]): any {
    const matchingSentiment = sentiments.find(s => s.month === date.getMonth() && s.year === date.getFullYear());

    const monthSentiment: MonthSentiment = {
      monthDate: date,
      details: matchingSentiment ? {
        change: matchingSentiment.change,
        mspr: matchingSentiment.mspr
      } : undefined
    }

    return monthSentiment;
  }

  private getDate(numberOfMonthsAgo: number = 0): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - numberOfMonthsAgo);
    return date;
  }
}
