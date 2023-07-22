import { Chain } from '../utils';

export const chains = [
  {
    id: Chain.Ethereum,
    label: 'Ethereum',
    token: 'ETH',
    rpcUrl:
      process.env.REACT_APP_MAINNET_HTTPS_RPC_URL ?? 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrl: 'https://etherscan.com/',
  },
  {
    id: Chain.Goerli,
    label: 'Goerli',
    token: 'ETH',
    rpcUrl: process.env.REACT_APP_GOERLI_HTTPS_RPC_URL ?? 'https://eth-goerli.public.blastapi.io',
    blockExplorerUrl: 'https://etherscan.com/',
  },
  {
    id: Chain.Polygon,
    label: 'Polygon',
    token: 'MATIC',
    rpcUrl:
      process.env.REACT_APP_POLYGON_HTTPS_RPC_URL ??
      'https://polygon-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrl: 'https://polygonscan.com/',
  },
  {
    id: Chain.Arbitrum,
    label: 'Arbitrum',
    token: 'ETH',
    rpcUrl: process.env.REACT_APP_ARBITRUM_HTTPS_RPC_URL ?? 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrl: 'https://arbiscan.io/',
  },
  {
    id: Chain.Optimism,
    label: 'Optimism',
    token: 'ETH',
    rpcUrl: process.env.REACT_APP_OPTIMISM_HTTPS_RPC_URL ?? 'https://rpc.ankr.com/optimism',
    blockExplorerUrl: 'https://optimistic.etherscan.io/',
  },
  {
    id: Chain.Avalanche,
    label: 'Avalanche',
    token: 'AVAX',
    rpcUrl: process.env.REACT_APP_AVALANCHE_HTTPS_RPC_URL ?? 'https://rpc.ankr.com/avalanche',
    blockExplorerUrl: 'https://snowtrace.io/',
  },
];
