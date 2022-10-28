const finnhubUrl = Cypress.env('finnhubBaseUrl');

export function goToSentimentSelector(symbol: string) { return `#sentiment${symbol}`; }
export function removeSentimentSelector(symbol: string) { return `#remove${symbol}`; }

export function getSearchUrl(symbol: string) { return `${finnhubUrl}/search?*q=${symbol}*`; }

export function getSentimentUrl(symbol: string) { return `${finnhubUrl}/stock/insider-sentiment?*symbol=${symbol}*from=*&to=*`; }

export function getQuoteUrl(symbol: string) { return `${finnhubUrl}/quote?*symbol=${symbol}*`; }