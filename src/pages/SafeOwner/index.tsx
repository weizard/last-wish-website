import React, { useEffect, useState } from 'react';

import { Button } from 'src/components/Button';
import { Container } from 'src/components/Container';
import { Contract } from 'ethers';
import { Input } from 'src/components/Input';
import LastWishABI from 'src/libs/abis/LastWishPlugin.json';
import { SetHeirDialog } from './SetHeirDialog';
import { UserAddIcon } from 'src/components/Icons/UserAdd';
import { getAddress } from 'ethers/lib/utils';
import { isZeroAddress } from '@safe-global/protocol-kit/dist/src/utils';
import moment from 'moment';
import { secondsToDhms } from 'src/libs/utils';
import { useRootStore } from 'src/store/root';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const abi = [
  'function enableModule(address module)',
  'function isModuleEnabled(address module)public view returns (bool)',
];

const Td = ({ className, children }: Props) => <th className={className ?? 'border border-slate-600'}>{children}</th>;

export function SafeOwner() {
  // TODO: testing address to be update
  // const safeAddress = '';
  const [inherit, setInherit] = useState('');
  const [inheritInputError, setInheritInputError] = useState('');
  const [isValidInherit, setIsValidInherit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [safeAlert, setSafeAlert] = useState(false);
  const { safe, provider } = useRootStore();
  const [heir, setHeir] = useState('');
  const [inheritingStart, setInheritingStart] = useState(0);
  const [timeLock, setTimeLock] = useState(0);
  const [inheritingAt, setInheritingAt] = useState(0);

  useEffect(() => {
    if (!safe || !provider) return;
    (async () => {
      const contract = new Contract('', LastWishABI, provider?.getSigner());
      const { recipient: _heir, inheritingStart, timeLock } = await contract.heirs(safe);
      isZeroAddress(_heir) ? setHeir('') : setHeir(_heir);
      setInheritingStart(inheritingStart.toNumber());
      setTimeLock(timeLock.toNumber());
      setInheritingAt(inheritingStart.toNumber() + timeLock.toNumber());
    })();
  }, []);

  const handleEnableModule = () => {
    console.log('safeAddress:', safe);

    (async () => {
      if (!safe || !provider) return;
      const contract = new Contract(safe, abi, provider.getSigner());
      await contract.enableModule('');
    })();
  };

  const openSetHeir = () => {
    safe ? setIsOpen(true) : setSafeAlert(true);
  };

  const handleSetHeir = () => {
    console.log('inherit :>> ', inherit);
    if (!safe || !provider) return;
    (async () => {
      const contract = new Contract('', LastWishABI, provider?.getSigner());
      await contract.setHeir(inherit, moment.duration({ days: 30 }).asSeconds());
    })();
    setIsOpen(false);
  };

  const handleRejectInherit = () => {
    console.log('inherit :>> ', inherit);
    if (!safe || !provider) return;
    (async () => {
      const contract = new Contract('', LastWishABI, provider?.getSigner());
      // reset safe heir info
      await contract.rejectSafeTransfer();
    })();
    setIsOpen(false);
  };

  const handleInheritChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInheritInputError('');
    setIsValidInherit(false);
    if (!event.target.value) return;
    let address = '';
    try {
      address = getAddress(event.target.value.toLowerCase());
    } catch (error) {
      setInheritInputError('invalid address');
      return;
    }
    setIsValidInherit(true);
    setInherit(address);
  };

  return (
    <Container title="Safe Owner">
      <SetHeirDialog isOpen={safeAlert && !safe} onClose={() => setSafeAlert(false)} title="">
        <div className="flex justify-center">
          <a className="text-red-500 text-lg font-bold">Please connect safe first</a>
        </div>
      </SetHeirDialog>
      <SetHeirDialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Set Heir">
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Choose who will inherit it; this safe might be available for the chosen person 30 days after they apply.
          </p>
          <div className="mt-6 mb-6 flex">
            Address:
            <Input onChange={handleInheritChange} errorMsg={inheritInputError} />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSetHeir} disabled={!isValidInherit}>
            Add
          </Button>
          {/* <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 enabled:hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleSetHeir}
            disabled={!isValidInherit}
          >
            Add
          </button> */}
        </div>
      </SetHeirDialog>
      <div className="grid md:grid-flow-col md:auto-cols-max md:gap-4 items-center">
        <div className="text-lg">Safe Address:</div>
        {safe ? (
          <div>
            <a className="mr-8">{safe}</a>
            <Button onClick={handleEnableModule} disabled={!safe}>
              Enable Module
            </Button>
          </div>
        ) : (
          <a className="text-red-500 text-lg font-bold">Please connect safe first</a>
        )}
      </div>
      <div>
        <div className="flex mt-12">
          inherit list & status
          {!heir && (
            <button className="ml-3" onClick={openSetHeir}>
              <UserAddIcon />
            </button>
          )}
        </div>
        <table className="border-separate border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">address</th>
              <th className="border border-slate-600">peroid</th>
              <th className="border border-slate-600">inheritingAt</th>
              <th className="border border-slate-600">action</th>
            </tr>
          </thead>
          <tbody>
            {!heir && (
              <tr>
                <Td>{heir}</Td>
                <Td>{secondsToDhms(timeLock)}</Td>
                <Td>{inheritingAt ? moment.unix(inheritingAt).toISOString() : ''}</Td>
                <Td>
                  {inheritingAt ? (
                    <Button onClick={handleRejectInherit}>reject</Button>
                  ) : (
                    <Button onClick={handleRejectInherit}>remove</Button>
                  )}
                </Td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="mt-28">history</div>
        <table className="border-separate border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">inherit</th>
              <th className="border border-slate-600">deadline</th>
              <th className="border border-slate-600">action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>0x0000000000000000000000000000000000000000</Td>
              <Td>10 days</Td>
              <Td>
                <Button>reject</Button>
              </Td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </Container>
  );
}
