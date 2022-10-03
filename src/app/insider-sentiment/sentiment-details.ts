export interface MonthSentimentDetails {
  change: number; 
  mspr: number;
}

export interface MonthSentiment {
  monthDate: Date;
  details?: MonthSentimentDetails;
}

export interface SentimentDetails {
  symbol: string;
  description: string;
  currentMonthSentiment: MonthSentiment;
  oneMonthAgoSentiment: MonthSentiment;
  twoMonthsAgoSentiment: MonthSentiment;
}