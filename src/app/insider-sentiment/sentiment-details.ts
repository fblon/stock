export interface MonthSentiment {
  monthDate: Date;
  change: number; 
  mspr: number;
}

export interface SentimentDetails {
  symbol: string;
  description: string;
  currentMonthSentiment: MonthSentiment;
  oneMonthAgoSentiment: MonthSentiment;
  twoMonthsAgoSentiment: MonthSentiment;
}