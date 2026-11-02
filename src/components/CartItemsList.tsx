import { useShallow } from 'zustand/react/shallow';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils';

export default function CartItemsList() {
  // useShallow: object selector compared shallowly, so it only re-renders when
  // `items` or `removeItem` actually change, not on every store mutation.
  const { items, removeItem } = useCartStore(
    useShallow((state) => ({ items: state.items, removeItem: state.removeItem })),
  );

  if (items.length === 0) return <p className="status">Your cart is empty.</p>;

  return (
    <ul className="cart-list">
      {items.map((item) => (
        <li key={item.id} className="cart-row">
          <div>
            <strong>{item.name}</strong>
            <div className="muted">
              {item.quantity} × {formatPrice(item.price)}
            </div>
          </div>
          <div className="cart-row-end">
            <span>{formatPrice(item.price * item.quantity)}</span>
            <button className="btn btn-danger" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
