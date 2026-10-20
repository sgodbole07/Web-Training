import { use, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { useUser } from '../context/UserContext.jsx';

export default function ProductList({ productsPromise }) {
  // use() suspends this component until the Promise resolves.
  // If it rejects, the nearest ErrorBoundary takes over.
  const products = use(productsPromise);
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <p className="muted" aria-live="polite">
        {products.length} products · Cart: {cartCount}
        {!user && ' · Register to start adding items'}
      </p>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} canBuy={Boolean(user)} onAdd={() => setCartCount((c) => c + 1)} />
        ))}
      </div>
    </>
  );
}
