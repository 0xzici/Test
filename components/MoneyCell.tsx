'use client';

export default function MoneyCell({ value }: { value: number | undefined }) {
  if (value === undefined) return <span className="text-neutral-500">N/A</span>;
  return <span>{value.toFixed(2)}</span>;
}
