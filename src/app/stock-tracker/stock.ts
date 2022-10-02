export interface Stock {
  symbol: string;
  description: string;
  currentPrice: number;
  percentChange: number;
  highPriceOfTheDay: number;
  openingPriceOfTheDay: number;
}