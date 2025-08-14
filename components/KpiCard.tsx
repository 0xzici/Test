'use client';

import { ReactNode } from 'react';

export default function KpiCard({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="p-2 bg-neutral-800 rounded border border-neutral-700 text-sm">
      <div className="text-neutral-400">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {sub && <div className="text-xs text-neutral-500">{sub}</div>}
    </div>
  );
}
