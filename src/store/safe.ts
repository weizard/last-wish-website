import { RootStore } from './root';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import SafeApiKit from '@safe-global/api-kit';
import { StateCreator } from 'zustand';
import { ethers } from 'ethers';
import { safeServiceEndpoint } from 'src/libs/gnosis-safe/configs';

export interface SafeSlice {
  safeSDK?: Safe;
  safeService?: SafeApiKit;
  isLoadingSafe: boolean;
  fetchConnectedSafe: () => Promise<void>;
}

export const createSafeSlice: StateCreator<
  RootStore,
  [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]],
  [],
  SafeSlice
> = (set, get) => ({
  safeSDK: undefined,
  safeService: undefined,
  isLoadingSafe: false,
  fetchConnectedSafe: async () => {
    const provider = get().provider;
    const safeAddress = get().safe;
    const chainId = get().chainId;
    const wallet = get().wallet;
    if (provider && safeAddress && chainId && wallet) {
      console.log(1);
      console.log(provider);
      console.log(provider.getSigner());
      set({ isLoadingSafe: true });
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: provider.getSigner(),
      });
      const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress,
      });
      const safeService = new SafeApiKit({
        txServiceUrl: safeServiceEndpoint[chainId],
        ethAdapter,
      });
      set({ isLoadingSafe: false, safeSDK, safeService });
    }
  },
});
