import { useState } from 'react';
import { percentFormatter, priceFormatter } from '@/utils/formatters.ts';

export type MarketData = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  quoteVolume: string;
};

export type RecentTrade = {
  id: number;
  price: number;
  qty: number;
  quoteQty: string;
  time: number;
};

export type RecentTradeSortField = keyof Pick<
  RecentTrade,
  'time' | 'price' | 'qty'
>;

export type Data = {
  marketData: MarketData;
  recentTrades: RecentTrade[];
};

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
    time: parseInt(trade.time),
    price: parseFloat(trade.price),
    qty: parseFloat(trade.qty),
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
