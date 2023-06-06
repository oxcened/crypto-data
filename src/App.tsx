import Form, { FormProps } from './components/Form/Form.tsx';
import { useState } from 'react';
import { useMarketData } from '@/hooks/useMarketData.ts';

export default function App() {
  const [pair, setPair] = useState<string>('');
  const { data, isLoading, fetch } = useMarketData();
  const isSubmitDisabled = !pair || isLoading;

  const handleSubmit: FormProps['onSubmit'] = (e) => {
    e.preventDefault();

    if (!isSubmitDisabled) {
      fetch(pair);
    }
  };

  return (
    <main className="my-12 text-center">
      <h1 className="text-4xl">Welcome to CryptoData 👋</h1>
      <p className="text-xl mt-3">Please select a pair and hit the button.</p>

      <Form
        isSubmitDisabled={isSubmitDisabled}
        pairValue={pair}
        onPairValueChange={(e) => setPair(e.target.value)}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
