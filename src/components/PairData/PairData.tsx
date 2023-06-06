import { Data, RecentTradeSortField } from '@/hooks/useData.ts';
import { HTMLProps } from 'react';
import { priceFormatter } from '@/utils/formatters.ts';

function TableHeader({
  sortDir,
  children,
  ...props
}: {
  sortDir?: 'asc' | 'desc';
} & HTMLProps<HTMLTableHeaderCellElement>) {
  let sortIcon = undefined;

  if (sortDir) {
    sortIcon = sortDir === 'asc' ? <>&darr;</> : <>&uarr;</>;
  }

  return (
    <th className="cursor-pointer" {...props}>
      {children}
      {sortIcon}
    </th>
  );
}

export type PairDataProps = {
  data: Data;
  sort?: [RecentTradeSortField, 'asc' | 'desc'];
  onSortRecentTrades: (field: RecentTradeSortField) => void;
};

export default function PairData({
  data: { marketData, recentTrades },
  sort,
  onSortRecentTrades,
}: PairDataProps) {
  function getSortDir(field: string) {
    if (sort?.[0] !== field) return;
    return sort[1];
  }

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
          <thead className="select-none">
            <tr>
              <TableHeader
                sortDir={getSortDir('time')}
                onClick={() => onSortRecentTrades('time')}
              >
                Time
              </TableHeader>

              <TableHeader
                sortDir={getSortDir('price')}
                onClick={() => onSortRecentTrades('price')}
              >
                Price (USDT)
              </TableHeader>

              <TableHeader
                sortDir={getSortDir('qty')}
                onClick={() => onSortRecentTrades('qty')}
              >
                Quantity
              </TableHeader>
            </tr>
          </thead>

          <tbody className="font-mono">
            {recentTrades.map((trade) => (
              <tr key={trade.id}>
                <td>{new Date(trade.time).toLocaleTimeString()}</td>
                <td>{priceFormatter.format(trade.price)}</td>
                <td>{trade.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
