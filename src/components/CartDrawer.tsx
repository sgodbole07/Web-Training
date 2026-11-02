import { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { createOrder } from '../api';
import { cartItemsAtom, clearCartAtom, totalPriceAtom } from '../store/cartAtoms';
import type { CheckoutResult, CheckoutStatus } from '../types';
import { formatPrice } from '../utils';
import CartItemsList from './CartItemsList';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useAtomValue(cartItemsAtom);
  const total = useAtomValue(totalPriceAtom);
  const clearCart = useSetAtom(clearCartAtom);
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setStatus('submitting');
    setError(null);
    try {
      const order = await createOrder(items, total);
      setResult(order);
      setStatus('success');
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setStatus('error');
    }
  }

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-header">
        <h2>Your Cart</h2>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      {status === 'success' && result && (
        <p className="alert success">Order #{result.id} placed — {formatPrice(result.total)}.</p>
      )}
      {status === 'error' && <p className="alert error">{error}</p>}

      <CartItemsList />

      <div className="drawer-footer">
        <div className="total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button
          className="btn btn-primary"
          disabled={items.length === 0 || status === 'submitting'}
          onClick={handleCheckout}
        >
          {status === 'submitting' ? 'Processing…' : 'Checkout'}
        </button>
      </div>
    </aside>
  );
}
