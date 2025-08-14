'use client';

import { useState } from 'react';
import { usePositionsStore } from '@/lib/store';

export default function AddPositionDialog() {
  const { addPosition } = usePositionsStore();
  const [tokenId, setTokenId] = useState('');

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        className="bg-neutral-800 border border-neutral-700 rounded p-1 text-sm"
        placeholder="TokenId"
        value={tokenId}
        onChange={e => setTokenId(e.target.value)}
      />
      <button
        className="px-2 py-1 bg-neutral-700 rounded text-sm"
        onClick={() => {
          if (tokenId) {
            addPosition(tokenId);
            setTokenId('');
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
