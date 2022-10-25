export {};

declare global {
  namespace Cypress {
    interface Chainable {
      checkDefaultPage(): void;
      checkSentimentPage(): void;
      check404Page(): void;
    }
  }
}