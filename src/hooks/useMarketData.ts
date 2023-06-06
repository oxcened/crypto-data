import { useState } from 'react';

export type MarketData = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  openPrice: string;
  quoteVolume: string;
};

async function fetchMarketData(pair: string) {
  const url = new URL('https://api.binance.com/api/v3/ticker/24hr');
  url.searchParams.set('symbol', pair);
  const response = await fetch(url);
  return response.json();
}

export function useMarketData() {
  const [data, setData] = useState<MarketData>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function fetch(pair: string) {
    setData(undefined);
    setError(false);
    setLoading(true);

    fetchMarketData(pair)
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  return {
    data,
    isLoading,
    isError,
    fetch,
  };
}
