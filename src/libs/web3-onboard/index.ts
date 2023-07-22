import { chains } from './configs';
import gnosisModule from '@web3-onboard/gnosis';
import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';

const projectId = '89ad105f96c451c274711f841c276f95';
const injected = injectedModule();
const safe = gnosisModule();
const walletConnect = walletConnectModule({
  version: 2,
  projectId,
});

export default init({
  wallets: [injected, walletConnect, safe],
  chains,
  connect: { showSidebar: false },
  accountCenter: {
    desktop: { enabled: true, position: 'topRight' },
    mobile: { enabled: true, position: 'topRight' },
  },
  disableFontDownload: true,
});
