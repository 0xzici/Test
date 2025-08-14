export type Ref = 'USD' | 'ETH';

export type Money = {
  raw: string;
  decimals: number;
  symbol: string;
  usd?: number;
  eth?: number;
};

export type Fees = {
  token0: Money;
  token1: Money;
  usd?: number;
  eth?: number;
};

export type Position = {
  id: string; // `${chainId}:${tokenId}`
  chainId: 1;
  tokenId: string;
  pool: string;
  owner: string;
  token0: { address: string; symbol: string; decimals: number };
  token1: { address: string; symbol: string; decimals: number };
  feeTier: number;
  tickLower: number;
  tickUpper: number;
  currentTick: number;
  liquidity: string;
  amount0: Money;
  amount1: Money;
  value: { usd?: number; eth?: number };
  feesUncollected: Fees;
  feesCollected?: Fees;
  roi?: number;
  apr7d?: number;
  apr30d?: number;
};

export type Snapshot = {
  asOf: string; // ISO time
  totalFees: { token0: string; token1: string; usd?: number; eth?: number };
  value: { usd?: number; eth?: number };
};
