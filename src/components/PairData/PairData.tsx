import { MarketData } from '@/hooks/useMarketData.ts';

export type PairDataProps = {
  data: MarketData;
};

export default function PairData({ data }: PairDataProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 border p-4">
        <p>Currency Pair</p>
        <p className="font-mono">{data.symbol}</p>

        <p>Price</p>
        <p className="font-mono">{data.lastPrice}</p>

        <p>Change</p>
        <p className="font-mono">{data.priceChangePercent}</p>

        <p>24H Volume</p>
        <p className="font-mono">{data.quoteVolume}</p>
      </div>

      <div className="border p-4 mt-5">
        Recent trades
        {/*TODO add recent trades table*/}
      </div>
    </>
  );
}
