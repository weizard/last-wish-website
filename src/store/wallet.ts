import { RootStore } from './root';
import { StateCreator } from 'zustand';
import { WalletState } from '@web3-onboard/core';
import { ethers } from 'ethers';

export interface WalletSlice {
  safe?: string;
  account?: string;
  provider?: ethers.providers.Web3Provider;
  chainId?: number;
  wallet?: WalletState;
  setAccount: (account: string | undefined) => void;
  setProvider: (provider: ethers.providers.Web3Provider | undefined) => void;
  setWallet: (wallet: WalletState) => void;
  resetWallet: () => void;
}

export const createWalletSlice: StateCreator<
  RootStore,
  [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]],
  [],
  WalletSlice
> = (set) => ({
  safe: undefined,
  account: undefined,
  provider: undefined,
  chainId: 1,
  wallet: undefined,
  setAccount(account) {
    set({ account });
  },
  setProvider(provider) {
    set({ provider });
  },
  setWallet(wallet) {
    const chainId = Number(wallet.chains[0].id);
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const safe = wallet.label === 'Safe' ? wallet.accounts[0].address : undefined;
    const account = wallet.accounts[0].address;

    set({ provider, safe, account, chainId, wallet });
  },
  resetWallet() {
    set({ provider: undefined, safe: undefined, account: undefined });
  },
});
