import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import Catalog from './components/Catalog';
import Header from './components/Header';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CartProvider>
      <Header onToggleCart={() => setDrawerOpen((open) => !open)} />
      <main className="main">
        <Catalog />
      </main>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </CartProvider>
  );
}
