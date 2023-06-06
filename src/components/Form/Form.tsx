import currencyPairs from '@/assets/currencyPairs.json';
import { FormEventHandler, useState } from 'react';

export type FormProps = {
  isLoading: boolean;
  onSubmit: (pair: string) => void;
};

export default function Form({ isLoading, onSubmit }: FormProps) {
  const [pair, setPair] = useState<string>('');
  const isFormInvalid = !pair;
  const isSubmitDisabled = isFormInvalid || isLoading;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!isSubmitDisabled) {
      onSubmit(pair);
    }
  };

  return (
    <form
      className="flex justify-center gap-5 mt-5 mb-8"
      onSubmit={handleSubmit}
    >
      <select
        className="border-2 border-black p-2"
        value={pair}
        onChange={(e) => setPair(e.target.value)}
      >
        <option value="">Select a pair</option>

        {currencyPairs.map(({ baseSymbol, quoteSymbol }) => {
          const value = [baseSymbol, quoteSymbol].join('');
          return (
            <option key={value} value={value}>
              {baseSymbol} / {quoteSymbol}
            </option>
          );
        })}
      </select>

      <button
        type="submit"
        className={`text-neutral-200 py-2 px-4 ${
          isSubmitDisabled
            ? 'bg-neutral-500 cursor-not-allowed'
            : 'bg-neutral-900 hover:bg-neutral-800'
        }`}
        disabled={isSubmitDisabled}
      >
        {isFormInvalid ? 'Choose a pair first' : 'Get the data!'}
      </button>
    </form>
  );
}
