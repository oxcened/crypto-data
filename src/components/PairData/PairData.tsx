import { Data } from '@/hooks/useData.ts';

export type PairDataProps = {
  data: Data;
};

export default function PairData({
  data: { marketData, recentTrades },
}: PairDataProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 border p-4">
        <p>Currency Pair</p>
        <p className="font-mono">{marketData.symbol}</p>

        <p>Price (USDT)</p>
        <p className="font-mono">{marketData.lastPrice}</p>

        <p>24H Change</p>
        <p className="font-mono">{marketData.priceChangePercent}</p>

        <p>24H Volume (USDT)</p>
        <p className="font-mono">{marketData.quoteVolume}</p>
      </div>

      <div className="border p-4 mt-5">
        <p>Recent trades (up to 100)</p>

        <table className="w-full mt-5 text-left text-sm">
          <thead>
            <tr>
              <th>Time</th>
              <th>Price (USDT)</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody className="font-mono">
            {recentTrades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.time}</td>
                <td>{trade.price}</td>
                <td>{trade.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
