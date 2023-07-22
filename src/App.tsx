import React, { useEffect } from 'react';

import { Inherit } from './pages/Inherit';
import { Interface, getAddress } from 'ethers/lib/utils';
import { Layout } from './layouts';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SafeOwner } from './pages/SafeOwner';
import logo from './logo.svg';
import { useConnectWallet } from '@web3-onboard/react';
import { useRootStore } from './store/root';

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { safe, safeSDK, safeService, setWallet, resetWallet, account, provider } = useRootStore();

  useEffect(() => {
    if (wallet) {
      setWallet(wallet);
    } else {
      resetWallet();
    }
  }, [resetWallet, setWallet, wallet]);

  useEffect(() => {
    if (safeSDK) {
      const checkSafe = async () => {
        const modules = await safeSDK.getModules();
        console.log(modules);
        const owners = await safeSDK.getOwners();
        console.log(owners);
      };
      checkSafe();
    }
  }, [safeSDK]);

  const handleAddModule = () => {
    if (!safeSDK || !safeService || !safe || !account || !provider || !wallet) return;
    (async () => {
      const iface = new Interface(['function enableModule(address)']);
      await provider.getSigner().sendTransaction({
        to: safe,
        data: iface.encodeFunctionData('enableModule', ['']),
      });

      const enableModuleTx = await safeSDK.createEnableModuleTx('');

      // try {
      //   await safeSDK.executeTransaction(enableModuleTx);
      // } catch (error) {
      //   console.log(error);
      // }
      // gor:

      // return;
      // await safeSDK.signTransaction(enableModuleTx);

      // const enableModuleTxHash = await safeSDK.getTransactionHash(
      //   enableModuleTx
      // );
      // const senderSignature = await safeSDK.signTransactionHash(
      //   enableModuleTxHash
      // );

      // safeService.proposeTransaction({
      //   safeAddress: safe,
      //   safeTransactionData: enableModuleTx.data,
      //   safeTxHash: enableModuleTxHash,
      //   senderAddress: getAddress(account),
      //   senderSignature: senderSignature.data,
      // });
    })();
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/safeowner" element={<SafeOwner />} />
        <Route path="/inherit" element={<Inherit />} />
        <Route path="*" element={<Navigate to="/safeowner" replace />} />
      </Route>
    </Routes>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>
          <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
            {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
          </button>
          <button onClick={handleAddModule}>add module</button>
        </div>
      </header> */}
      <header className="w-full pb-5 dark:bg-gray-700 dark:text-white text-center">
        <nav className="bg-white border-gray-200 py-5 dark:bg-gray-900">
          <div className="flex flex-wrap space-x-8 items-center px-4 mx-auto">
            <a href="#" className="flex items-center">
              {/* <img src="./images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" /> */}
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">LastWish</span>
            </a>
            <div className="justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Safe Ower
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Inherit
                  </a>
                </li>
              </ul>
            </div>
            <div className="absolute top-5 right-4 lg:right-12 lg:order-2">
              {!wallet && (
                <button
                  disabled={connecting}
                  onClick={() => (wallet ? disconnect(wallet) : connect())}
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                >
                  {connecting ? 'connecting' : 'connect'}
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto p-5" style={{ backgroundColor: 'aqua' }}>
        {/* contain */}
      </main>
      <footer className="lg:hidden py-5 bg-gray-700 text-center text-white" style={{ backgroundColor: 'red' }}>
        123
      </footer>
    </div>
  );
}

export default App;
