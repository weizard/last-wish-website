import { ConnectButton } from './ConnectButton';
import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ConnectButton />
      <main className="flex flex-1 overflow-y-auto p-5 pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
