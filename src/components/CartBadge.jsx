import { useCart } from '../context/CartContext.jsx';

export default function CartBadge() {
  const { count, isPending } = useCart();

  return (
    <div className="cart" aria-live="polite">
      Cart: <strong>{count}</strong>
      {isPending && <span className="muted small-text"> saving…</span>}
    </div>
  );
}
