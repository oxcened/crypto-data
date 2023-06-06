import Form from './components/Form/Form.tsx';
import { useState } from 'react';

export default function App() {
  const [pair, setPair] = useState<string>('');

  function handleSubmit() {
    // TODO fetch from Binance API
  }

  return (
    <main className="my-12 text-center">
      <h1 className="text-4xl">Welcome to CryptoData 👋</h1>
      <p className="text-xl mt-3">Please select a pair and hit the button.</p>

      <Form
        pairValue={pair}
        onPairValueChange={(e) => setPair(e.target.value)}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
