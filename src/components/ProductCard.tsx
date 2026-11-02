import { memo } from 'react';
import type { Product } from '../types';
import { formatPrice } from '../utils';

// Shell: "Add to Cart" is wired to cart state in each deliverable branch.
function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      <button className="btn">Add to Cart</button>
    </article>
  );
}

export default memo(ProductCard);
