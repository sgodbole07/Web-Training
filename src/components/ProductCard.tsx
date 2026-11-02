import { memo } from 'react';
import { useSetAtom } from 'jotai';
import { addItemAtom } from '../store/cartAtoms';
import type { Product } from '../types';
import { formatPrice } from '../utils';

// Action-only: useSetAtom never subscribes to the cart, so no re-render on cart changes.
function ProductCard({ product }: { product: Product }) {
  const addItem = useSetAtom(addItemAtom);
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
