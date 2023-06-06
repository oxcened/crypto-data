import Form from './components/Form/Form.tsx';
import { useData } from '@/hooks/useData.ts';
import PairData from '@/components/PairData/PairData.tsx';

export default function App() {
  const { data, isLoading, isError, fetch, sortRecentTrades, sort } = useData();

  return (
    <>
      <main className="px-4 py-6 lg:py-10 max-w-md mx-auto">
        <h1 className="text-4xl text-center">Welcome to CryptoData 👋</h1>
        <p className="text-xl mt-3 text-center">
          Please select a pair and hit the button.
        </p>

        <Form isLoading={isLoading} onSubmit={fetch} />

        {isLoading && 'Loading, please wait...'}
        {isError && 'Ouch, an error occurred! Please try again.'}
        {data && (
          <PairData
            data={data}
            sort={sort}
            onSortRecentTrades={sortRecentTrades}
          />
        )}
      </main>

      <footer className="text-center pb-10 text-sm">
        Made with ❤️ by Alen
      </footer>
    </>
  );
}
