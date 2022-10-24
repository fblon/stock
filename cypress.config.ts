import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    stockInputSelector: '#stockInput',
    trackButtonSelector: '#trackBtn',
  },
  e2e: {
    baseUrl: 'http://localhost:4200/',
  },
});
