import { useCallback, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useUser } from '../context/UserContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function AddToCartButton({ disabled }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={disabled || pending}>
      {pending ? 'Adding…' : 'Add to cart'}
    </button>
  );
}

export default function ProductDetails({ product, onBack }) {
  const { user } = useUser();
  const { addToCart, isPending, error } = useCart();
  const [size, setSize] = useState(null);

  // React 19 callback ref with cleanup:
  // - runs when the element is attached to the DOM
  // - the function it returns runs when the element is removed (or the ref changes)
  // No more `ref(null)` call to handle manually.
  const imageAreaRef = useCallback((node) => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    observer.observe(node);
    console.log('[ref] ResizeObserver attached');

    return () => {
      observer.disconnect();
      console.log('[ref] ResizeObserver disconnected (cleanup)');
    };
  }, []);

  return (
    <section className="panel" aria-labelledby="product-title">
      <button type="button" className="link" onClick={onBack}>
        ← Back to products
      </button>

      <div className="details-grid">
        <div>
          <div ref={imageAreaRef} className="details-image">
            <img src={product.image} alt={product.name} width="400" height="260" />
          </div>
          {size && (
            <p className="muted small-text">
              Image area: {size.width} × {size.height}px
            </p>
          )}
        </div>

        <div className="details-info">
          <span className="tag">{product.category}</span>
          <h2 id="product-title">{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>

          {/* Form actions run inside a transition, which is what useOptimistic needs */}
          <form action={() => addToCart(product)}>
            <AddToCartButton disabled={!user} />
          </form>

          {!user && <p className="muted">Register to add items to your cart.</p>}
          {isPending && (
            <p className="muted" aria-live="polite">
              Saving to your cart…
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
