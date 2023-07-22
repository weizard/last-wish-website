import { Chain } from '../utils';

export const safeServiceEndpoint: Record<number, string> = {
  [Chain.Ethereum]: 'https://safe-transaction-mainnet.safe.global',
  [Chain.Goerli]: 'https://safe-transaction-goerli.safe.global',
  [Chain.Polygon]: 'https://safe-transaction-polygon.safe.global',
  [Chain.Arbitrum]: 'https://safe-transaction-arbitrum.safe.global',
  [Chain.Avalanche]: 'https://safe-transaction-avalanche.safe.global',
  [Chain.Optimism]: 'https://safe-transaction-optimism.safe.global',
};
