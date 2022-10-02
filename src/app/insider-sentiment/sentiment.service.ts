import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { FinnhubService, MonthInsiderSentiment } from '../shared/finnhub.service';
import { MonthSentiment, Sentiment } from './sentiment';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private finnhubService: FinnhubService) { }

  getSentiment(symbol: string): Observable<Sentiment | undefined> {
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
        })
      );
  }

  private getMonthSentiment(date: Date, sentiments: MonthInsiderSentiment[]): any {
    const matchingSentiment = sentiments.find(s => s.month === date.getMonth() && s.year === date.getFullYear());

    if (!matchingSentiment) {
      return undefined;
    }

    const monthSentiment: MonthSentiment = {
      monthDate: date,
      change: matchingSentiment.change,
      mspr: matchingSentiment.mspr
    }

    return monthSentiment;
  }

  private getDate(numberOfMonthsAgo: number = 0) : Date {
    const date = new Date();
    date.setMonth(date.getMonth() - numberOfMonthsAgo);
    return date;
  }
}
