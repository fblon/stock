export {};

declare global {
  namespace Cypress {
    interface Chainable {
      checkEmptyStockTrackerPage(): void;
      checkGoToSentimentPage(symbol: string): void;
      checkSentimentPage(symbol: string): void;
      check404Page(): void;
      checkSpinner(): void;
    }
  }
}