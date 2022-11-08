const finnhubUrl = Cypress.env('finnhubBaseUrl');

export function goToSentimentSelector(symbol: string) { return `#sentiment${symbol.toUpperCase()}`; }
export function removeSentimentSelector(symbol: string) { return `#remove${symbol.toUpperCase()}`; }

export function getSearchUrl(symbol: string) { return `${finnhubUrl}/search?*q=${symbol.toUpperCase()}*`; }

export function getSentimentUrl(symbol: string) { return `${finnhubUrl}/stock/insider-sentiment?*symbol=${symbol.toUpperCase()}*from=*&to=*`; }

export function getQuoteUrl(symbol: string) { return `${finnhubUrl}/quote?*symbol=${symbol.toUpperCase()}*`; }