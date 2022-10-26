export {};

declare global {
  namespace Cypress {
    interface Chainable {
      checkDefaultPage(): void;
      checkSentimentPage(symbol: string): void;
      check404Page(): void;
      checkSpinner(): void;
    }
  }
}