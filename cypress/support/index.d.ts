export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getSpinner(): Cypress.Chainable<JQuery<HTMLElement>>;
      getStockInput(): Cypress.Chainable<JQuery<HTMLElement>>;
      getTrackButton(): Cypress.Chainable<JQuery<HTMLElement>>;
      getSentimentBackBtn(): Cypress.Chainable<JQuery<HTMLElement>>;
      getGoToSentiment(symbol: string): Cypress.Chainable<JQuery<HTMLElement>>;
      getRemoveSentiment(symbol: string): Cypress.Chainable<JQuery<HTMLElement>>;

      checkEmptyStockTrackerPage(): void;
      checkGoToSentimentPage(symbol: string): void;
      checkSentimentPage(symbol: string): void;
      check404Page(): void;
      checkSpinner(): void;
    }
  }
}