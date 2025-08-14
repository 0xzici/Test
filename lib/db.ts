import Dexie, { Table } from 'dexie';
import { Position, Snapshot } from './types';

export interface StoredPosition {
  id: string;
  chainId: number;
  tokenId: string;
  manualCost?: { ref: 'USD' | 'ETH'; amount: number };
  lastChainFetchAt?: string;
  snapshots: Snapshot[];
  data?: Position;
}

class AppDB extends Dexie {
  positions!: Table<StoredPosition, string>;
  constructor() {
    super('lp-db');
    this.version(1).stores({
      positions: 'id'
    });
  }
}

export const db = new AppDB();
