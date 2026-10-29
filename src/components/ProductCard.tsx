import { memo } from 'react';
import { useCartDispatch } from '../context/CartContext';
import type { Product } from '../types';
import { formatPrice } from '../utils';

// Only consumes the dispatch context, so it never re-renders on cart changes.
function ProductCard({ product }: { product: Product }) {
  const dispatch = useCartDispatch();
  return (
    <article className="card">
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      <button className="btn" onClick={() => dispatch({ type: 'ADD_ITEM', product })}>
        Add to Cart
      </button>
    </article>
  );
}

export default memo(ProductCard);
