import { selectTotalPrice, useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils';
import CartErrorBanner from './CartErrorBanner';
import CartItemsList from './CartItemsList';
import CheckoutButton from './CheckoutButton';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const total = useCartStore(selectTotalPrice);

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-header">
        <h2>Your Cart</h2>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      <CartErrorBanner />
      <CartItemsList />

      <div className="drawer-footer">
        <div className="total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <CheckoutButton />
      </div>
    </aside>
  );
}
