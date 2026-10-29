import { useCartState } from '../context/CartContext';
import { getTotalItems } from '../utils';

export default function CartBadge() {
  const { items } = useCartState();
  return <span className="cart-badge" aria-label="Items in cart">{getTotalItems(items)}</span>;
}
