import { useCartDispatch, useCartState } from '../context/CartContext';
import { formatPrice } from '../utils';

export default function CartItemsList() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

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
            <button
              className="btn btn-danger"
              onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
