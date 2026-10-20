import { use } from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductList({ productsPromise, onSelect }) {
  // use() suspends this component until the Promise resolves.
  // If it rejects, the nearest ErrorBoundary takes over.
  const products = use(productsPromise);

  return (
    <>
      <p className="muted">{products.length} products · Select one to see its details</p>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={onSelect} />
        ))}
      </div>
    </>
  );
}
