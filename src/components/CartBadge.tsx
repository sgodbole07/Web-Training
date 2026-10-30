import { selectTotalItems, useCartStore } from '../store/cartStore';

export default function CartBadge() {
  const count = useCartStore(selectTotalItems);
  return <span className="cart-badge" aria-label="Items in cart">{count}</span>;
}
