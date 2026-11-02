import { useState } from 'react';
import CartDrawer from './components/CartDrawer';
import CartSynchronizer from './components/CartSynchronizer';
import Catalog from './components/Catalog';
import Header from './components/Header';
import OrderCompletionBridge from './components/OrderCompletionBridge';
import PaymentPanel from './components/PaymentPanel';
import { CheckoutMachineContext } from './machines/CheckoutMachineContext';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CheckoutMachineContext.Provider>
      <CartSynchronizer />
      <OrderCompletionBridge />
      <Header onToggleCart={() => setDrawerOpen((open) => !open)} />
      <main className="main">
        <Catalog />
      </main>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <PaymentPanel />
    </CheckoutMachineContext.Provider>
  );
}
