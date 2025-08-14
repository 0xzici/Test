'use client';

import { useEffect } from 'react';
import KpiRow from '@/components/KpiRow';
import PositionsTable from '@/components/PositionsTable';
import AddPositionDialog from '@/components/AddPositionDialog';
import { usePositionsStore } from '@/lib/store';

export default function Page() {
  const seed = usePositionsStore(s => s.seedDemo);
  useEffect(() => {
    seed();
  }, [seed]);

  return (
    <main className="p-4 space-y-4">
      <KpiRow />
      <div className="flex items-center gap-2">
        <AddPositionDialog />
      </div>
      <PositionsTable />
    </main>
  );
}
