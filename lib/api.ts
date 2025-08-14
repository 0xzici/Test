import { Position, Ref } from './types';

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export async function getPosition(chainId: number, tokenId: string): Promise<Position> {
  // synthesize mock data
  const amount0 = randomBetween(0.1, 5);
  const amount1 = randomBetween(0.1, 3);
  const usd0 = amount0 * 3000; // pretend token0 is ETH
  const usd1 = amount1 * 1;    // token1 is USD stable

  return {
    id: `${chainId}:${tokenId}`,
    chainId: 1,
    tokenId,
    pool: '0xPool',
    owner: '0xOwner',
    token0: { address: '0xToken0', symbol: 'ETH', decimals: 18 },
    token1: { address: '0xToken1', symbol: 'USDC', decimals: 6 },
    feeTier: 3000,
    tickLower: -887220,
    tickUpper: 887220,
    currentTick: 0,
    liquidity: '0',
    amount0: { raw: amount0.toString(), decimals: 18, symbol: 'ETH', usd: usd0, eth: amount0 },
    amount1: { raw: amount1.toString(), decimals: 6, symbol: 'USDC', usd: usd1, eth: usd1 / 3000 },
    value: { usd: usd0 + usd1, eth: amount0 + usd1 / 3000 },
    feesUncollected: {
      token0: { raw: '0', decimals: 18, symbol: 'ETH', usd: 0, eth: 0 },
      token1: { raw: '0', decimals: 6, symbol: 'USDC', usd: 0, eth: 0 },
      usd: 0,
      eth: 0,
    },
    feesCollected: {
      token0: { raw: '0', decimals: 18, symbol: 'ETH', usd: 0, eth: 0 },
      token1: { raw: '0', decimals: 6, symbol: 'USDC', usd: 0, eth: 0 },
      usd: 0,
      eth: 0,
    }
  };
}

export async function getPrices(tokens: string[], ref: Ref): Promise<Record<string, number>> {
  const price = ref === 'USD' ? 3000 : 1/3000;
  const map: Record<string, number> = {};
  tokens.forEach(t => (map[t] = price));
  return map;
}

export async function summarize(positions: Position[], ref: Ref) {
  const totals = positions.reduce(
    (acc, p) => {
      acc.assetsValue += p.value[ref.toLowerCase() as 'usd'|'eth'] ?? 0;
      acc.totalFees += p.feesUncollected[ref.toLowerCase() as 'usd'|'eth'] ?? 0;
      return acc;
    },
    { assetsValue: 0, totalPnL: 0, pnlFromPools: 0, totalFees: 0, uncollected: 0 }
  );
  return totals;
}
