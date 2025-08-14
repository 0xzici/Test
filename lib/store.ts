'use client';

import { useState, useCallback } from 'react';
import { db, StoredPosition } from './db';
import { getPosition } from './api';
import { Position } from './types';

export function usePositionsStore() {
  const [positions, setPositions] = useState<StoredPosition[]>([]);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const all = await db.positions.toArray();
    setPositions(all);
    setLoaded(true);
  }, []);

  if (!loaded) {
    load();
  }

  const addPosition = useCallback(async (tokenId: string) => {
    const data: Position = await getPosition(1, tokenId);
    const stored: StoredPosition = {
      id: data.id,
      chainId: 1,
      tokenId,
      snapshots: [],
      data,
    };
    await db.positions.put(stored);
    setPositions(prev => [...prev.filter(p => p.id !== stored.id), stored]);
  }, []);

  const seedDemo = useCallback(async () => {
    if ((await db.positions.count()) === 0) {
      await addPosition('1');
      await addPosition('2');
    }
  }, [addPosition]);

  const setCost = useCallback(async (id: string, ref: 'USD' | 'ETH', amount: number) => {
    const p = positions.find(p => p.id === id);
    if (!p) return;
    const updated = { ...p, manualCost: { ref, amount } };
    await db.positions.put(updated);
    setPositions(prev => prev.map(x => (x.id === id ? updated : x)));
  }, [positions]);

  const removePosition = useCallback(async (id: string) => {
    await db.positions.delete(id);
    setPositions(prev => prev.filter(p => p.id !== id));
  }, []);

  const refreshPosition = useCallback(async (id: string) => {
    const p = positions.find(p => p.id === id);
    if (!p) return;
    const data = await getPosition(1, p.tokenId);
    const snapshot = {
      asOf: new Date().toISOString(),
      totalFees: {
        token0: data.feesUncollected.token0.raw,
        token1: data.feesUncollected.token1.raw,
        usd: data.feesUncollected.usd,
        eth: data.feesUncollected.eth,
      },
      value: data.value,
    };
    const updated: StoredPosition = {
      ...p,
      data,
      snapshots: [...p.snapshots, snapshot],
      lastChainFetchAt: snapshot.asOf,
    };
    await db.positions.put(updated);
    setPositions(prev => prev.map(x => (x.id === id ? updated : x)));
  }, [positions]);

  return {
    positions,
    addPosition,
    setCost,
    removePosition,
    refreshPosition,
    seedDemo,
  };
}
