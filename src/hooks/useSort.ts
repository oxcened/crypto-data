import { useMemo, useState } from 'react';
import { RecentTrade, RecentTradeSortField } from '@/hooks/useData.ts';

export default function useSort(data?: RecentTrade[]) {
  const [sort, setSort] = useState<[RecentTradeSortField, 'asc' | 'desc']>();

  const sorted = useMemo(() => {
    if (!data) return undefined;
    if (!sort) return data;

    const [sortField, sortOrder] = sort;

    return [...data].sort((a, b) => {
      return sortOrder === 'asc'
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    });
  }, [data, sort]);

  function handleSort(field: RecentTradeSortField) {
    let order: 'asc' | 'desc' = 'asc';

    if (sort?.[0] === field && sort?.[1] === 'asc') {
      order = 'desc';
    }

    setSort([field, order]);
  }

  return {
    data: sorted,
    handleSort,
    sort,
  };
}
