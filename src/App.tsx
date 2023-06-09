import Form from './components/Form/Form.tsx';
import { useData } from '@/hooks/useData.ts';
import PairData from '@/components/PairData/PairData.tsx';
import useSort from '@/hooks/useSort.ts';

export default function App() {
  const { data, isLoading, isError, fetch } = useData();
  const { data: sorted, sort, handleSort } = useSort(data?.recentTrades);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="px-4 py-6 lg:py-10 max-w-md mx-auto flex-1">
        <h1 className="text-4xl text-center">Welcome to CryptoData 👋</h1>
        <p className="text-xl mt-3 text-center">
          Please select a pair and hit the button.
        </p>

        <Form isLoading={isLoading} onSubmit={fetch} />

        {isLoading && 'Loading, please wait...'}
        {isError && 'Ouch, an error occurred! Please try again.'}
        {data && sorted && (
          <PairData
            marketData={data.marketData}
            recentTrades={sorted}
            sort={sort}
            onSortRecentTrades={handleSort}
          />
        )}
      </main>

      <footer className="text-center pb-10 text-sm">
        Made with ❤️ by Alen
      </footer>
    </div>
  );
}
