export {};

declare global {
  namespace Cypress {
    interface Chainable {
      checkDefaultPage(): void;
    }
  }
}