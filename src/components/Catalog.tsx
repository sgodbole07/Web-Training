import { memo, useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import type { Product } from '../types';
import ProductCard from './ProductCard';

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal)
      .then(setProducts)
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  if (loading) return <p className="status">Loading products…</p>;
  if (error) return <p className="status error">{error}. Is `npm run server` running?</p>;

  return (
    <section className="catalog">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default memo(Catalog);
