import { memo } from 'react';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';
import { formatPrice } from '../utils';

// Subscribes only to the (stable) addItem action, so it never re-renders on cart changes.
function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <article className="card">
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      <button className="btn" onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </article>
  );
}

export default memo(ProductCard);
