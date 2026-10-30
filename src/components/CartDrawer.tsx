import { formatPrice } from '../utils';
import CartItemsList from './CartItemsList';

// Shell: totals and checkout are wired to cart state in each deliverable branch.
export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="drawer-header">
        <h2>Your Cart</h2>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      <CartItemsList />

      <div className="drawer-footer">
        <div className="total">
          <span>Total</span>
          <strong>{formatPrice(0)}</strong>
        </div>
        <button className="btn btn-primary" disabled>
          Checkout
        </button>
      </div>
    </aside>
  );
}
