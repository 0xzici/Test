'use client';

import { usePositionsStore } from '@/lib/store';
import MoneyCell from './MoneyCell';
import SetCostDialog from './SetCostDialog';
import { useDailyIncome } from '@/hooks/useSnapshots';

export default function PositionsTable() {
  const { positions, refreshPosition, removePosition } = usePositionsStore();

  return (
    <table className="min-w-full text-sm border-collapse">
      <thead className="sticky top-0 bg-neutral-900">
        <tr className="text-left">
          <th className="p-2">TokenId</th>
          <th className="p-2">Value (USD)</th>
          <th className="p-2">Fees</th>
          <th className="p-2">Daily income</th>
          <th className="p-2">ROI</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {positions.map(p => {
          const daily = useDailyIncome(p.snapshots);
          const cost = p.manualCost?.amount ?? 0;
          const value = p.data?.value.usd ?? 0;
          const fees = p.data?.feesUncollected.usd ?? 0;
          const roi = cost ? ((value + fees - cost) / cost) * 100 : undefined;
          return (
            <tr key={p.id} className="border-t border-neutral-800">
              <td className="p-2">{p.tokenId}</td>
              <td className="p-2"><MoneyCell value={value} /></td>
              <td className="p-2"><MoneyCell value={fees} /></td>
              <td className="p-2"><MoneyCell value={daily} /></td>
              <td className="p-2">
                {roi === undefined ? <span className="text-neutral-500">N/A</span> : roi.toFixed(2) + '%'}
              </td>
              <td className="p-2 flex gap-1">
                <button className="text-xs underline" onClick={() => refreshPosition(p.id)}>Refresh</button>
                <SetCostDialog id={p.id} />
                <button className="text-xs underline" onClick={() => removePosition(p.id)}>Remove</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
