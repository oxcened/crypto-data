import Form from './components/Form/Form.tsx';
import { useMarketData } from '@/hooks/useMarketData.ts';

export default function App() {
  const { data, isLoading, fetch } = useMarketData();

  return (
    <main className="my-12 text-center">
      <h1 className="text-4xl">Welcome to CryptoData 👋</h1>
      <p className="text-xl mt-3">Please select a pair and hit the button.</p>

      <Form isLoading={isLoading} onSubmit={fetch} />
    </main>
  );
}
