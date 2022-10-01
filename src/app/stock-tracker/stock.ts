export interface Stock {
  name: string;
  currentPrice: number;
  percentChange: number;
  percentChangeSign: '+' | '-';
  highPriceOfTheDay: number;
  openingPriceOfTheDay: number;
}