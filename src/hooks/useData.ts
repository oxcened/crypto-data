import { useState } from 'react';

export type MarketData = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  openPrice: string;
  quoteVolume: string;
};

export type RecentTrade = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
};

export type Data = {
  marketData: MarketData;
  recentTrades: RecentTrade[];
};

async function fetchMarketData(pair: string) {
  const url = new URL('https://api.binance.com/api/v3/ticker/24hr');
  url.searchParams.set('symbol', pair);
  const response = await fetch(url);
  return response.json();
}

async function fetchRecentTrades(pair: string) {
  const url = new URL('https://api.binance.com/api/v3/trades');
  url.searchParams.set('symbol', pair);
  url.searchParams.set('limit', '100');
  const response = await fetch(url);
  return response.json();
}

export function useData() {
  const [data, setData] = useState<Data>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  function fetch(pair: string) {
    setData(undefined);
    setError(false);
    setLoading(true);

    Promise.all([fetchMarketData(pair), fetchRecentTrades(pair)])
      .then(([marketData, recentTrades]) =>
        setData({ marketData, recentTrades })
      )
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
