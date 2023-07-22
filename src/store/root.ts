import { SafeSlice, createSafeSlice } from './safe';
import { WalletSlice, createWalletSlice } from './wallet';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

export type RootStore = WalletSlice & SafeSlice;

export const useRootStore = create<RootStore>()(
  subscribeWithSelector(
    devtools((...args) => {
      return {
        ...createWalletSlice(...args),
        ...createSafeSlice(...args),
      };
    })
  )
);

useRootStore.subscribe(
  (state) => state.safe,
  (safe) => {
    if (safe) useRootStore.getState().fetchConnectedSafe();
  },
  { fireImmediately: true }
);
