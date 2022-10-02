export interface MonthSentiment {
  monthDate: Date;
  change: number; 
  mspr: number;
}

export interface Sentiment {
  symbol: string;
  description: string;
  currentMonthSentiment: MonthSentiment;
  oneMonthAgoSentiment: MonthSentiment;
  twoMonthsAgoSentiment: MonthSentiment;
}