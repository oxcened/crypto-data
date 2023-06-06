import { useState } from 'react';

export type MarketData = {
  symbol: string;
  lastPrice: number;
  priceChangePercent: string;
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

const priceFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
});

async function fetchMarketData(pair: string): Promise<MarketData> {
  const url = new URL('https://api.binance.com/api/v3/ticker/24hr');
  url.searchParams.set('symbol', pair);
  const response = await fetch(url);
  const json = await response.json();

  return {
    ...json,
    lastPrice: priceFormatter.format(parseFloat(json.lastPrice)),
    priceChangePercent: percentFormatter.format(
      parseFloat(json.priceChangePercent) / 100
    ),
    quoteVolume: priceFormatter.format(parseFloat(json.quoteVolume)),
  };
}

async function fetchRecentTrades(pair: string): Promise<RecentTrade[]> {
  const url = new URL('https://api.binance.com/api/v3/trades');
  url.searchParams.set('symbol', pair);
  url.searchParams.set('limit', '100');
  const response = await fetch(url);
  const json = await response.json();

  return json.map((trade: any) => ({
    ...trade,
    time: new Date(trade.time).toLocaleTimeString(),
    price: priceFormatter.format(parseFloat(trade.price)),
  }));
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
