'use client';

import { useEffect, useState } from 'react';
import { usePositionsStore } from '@/lib/store';
import { summarize } from '@/lib/api';
import KpiCard from './KpiCard';
import { Ref } from '@/lib/types';

export default function KpiRow() {
  const { positions } = usePositionsStore();
  const [ref, setRef] = useState<Ref>('USD');
  const [totals, setTotals] = useState<any>({ assetsValue: 0, totalFees: 0 });

  useEffect(() => {
    summarize(positions.map(p => p.data!).filter(Boolean), ref).then(setTotals);
  }, [positions, ref]);

  return (
    <div className="flex gap-2 overflow-x-auto">
      <KpiCard label="Assets" value={totals.assetsValue.toFixed(2)} />
      <KpiCard label="Total fees" value={totals.totalFees.toFixed(2)} />
      <div className="p-2 flex items-center gap-2">
        <span className="text-sm">Ref</span>
        <select
          className="bg-neutral-800 border border-neutral-700 rounded p-1 text-sm"
          value={ref}
          onChange={e => setRef(e.target.value as Ref)}
        >
          <option value="USD">USD</option>
          <option value="ETH">ETH</option>
        </select>
      </div>
    </div>
  );
}
