import { Button } from 'src/components/Button';
import { useConnectWallet } from '@web3-onboard/react';

export function ConnectButton() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <div className="absolute top-5 right-4 lg:right-12 lg:order-2">
      {!wallet && (
        <Button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
          {connecting ? 'connecting' : 'connect'}
        </Button>
      )}
    </div>
  );
}
