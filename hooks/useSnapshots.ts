import { Snapshot } from '@/lib/types';

export function useDailyIncome(snapshots: Snapshot[]) {
  if (snapshots.length < 2) return undefined;
  const today = snapshots[snapshots.length - 1];
  const yesterday = snapshots.findLast(s => {
    const d1 = new Date(today.asOf).setHours(0,0,0,0);
    const d2 = new Date(s.asOf).setHours(0,0,0,0);
    return d2 < d1;
  });
  if (!yesterday) return undefined;
  return (today.totalFees.usd ?? 0) - (yesterday.totalFees.usd ?? 0);
}
