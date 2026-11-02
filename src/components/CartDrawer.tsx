import { useShallow } from 'zustand/react/shallow';
import { selectTotalItems, selectTotalPrice, useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils';
import CartItemsList from './CartItemsList';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { status, error, lastOrder, checkout } = useCartStore(
    useShallow((state) => ({
      status: state.status,
      error: state.error,
      lastOrder: state.lastOrder,
      checkout: state.checkout,
    })),
  );
  const total = useCartStore(selectTotalPrice);
  const isEmpty = useCartStore(selectTotalItems) === 0;

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-header">
        <h2>Your Cart</h2>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      {status === 'success' && lastOrder && (
        <p className="alert success">
          Order #{lastOrder.id} placed — {formatPrice(lastOrder.total)}.
        </p>
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
          disabled={isEmpty || status === 'submitting'}
          onClick={checkout}
        >
          {status === 'submitting' ? 'Processing…' : 'Checkout'}
        </button>
      </div>
    </aside>
  );
}
