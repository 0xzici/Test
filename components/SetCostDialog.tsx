'use client';

import { useState } from 'react';
import { usePositionsStore } from '@/lib/store';

export default function SetCostDialog({ id }: { id: string }) {
  const { setCost } = usePositionsStore();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [ref, setRef] = useState<'USD' | 'ETH'>('USD');

  if (!open) {
    return (
      <button className="text-xs underline" onClick={() => setOpen(true)}>
        Set cost
      </button>
    );
  }

  return (
    <div className="flex gap-1 text-xs">
      <select
        className="bg-neutral-800 border border-neutral-700 rounded p-1"
        value={ref}
        onChange={e => setRef(e.target.value as any)}
      >
        <option value="USD">USD</option>
        <option value="ETH">ETH</option>
      </select>
      <input
        type="number"
        className="w-20 bg-neutral-800 border border-neutral-700 rounded p-1"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button
        className="px-2 bg-neutral-700 rounded"
        onClick={() => {
          setCost(id, ref, Number(amount));
          setOpen(false);
          setAmount('');
        }}
      >
        Save
      </button>
    </div>
  );
}
