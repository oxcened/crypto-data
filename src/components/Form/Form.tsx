import currencyPairs from '@/assets/currencyPairs.json';
import { ChangeEventHandler, FormEventHandler } from 'react';

export type FormProps = {
  isSubmitDisabled: boolean;
  pairValue: string;
  onPairValueChange: ChangeEventHandler<HTMLSelectElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function Form({
  isSubmitDisabled,
  pairValue,
  onPairValueChange,
  onSubmit,
}: FormProps) {
  return (
    <form className="flex justify-center gap-5 mt-5" onSubmit={onSubmit}>
      <select
        className="border-2 border-black p-2"
        value={pairValue}
        onChange={onPairValueChange}
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
        Get the data!
      </button>
    </form>
  );
}
