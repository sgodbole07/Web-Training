import { useAtomValue, useSetAtom } from 'jotai';
import { cartItemsAtom, removeItemAtom } from '../store/cartAtoms';
import { formatPrice } from '../utils';

export default function CartItemsList() {
  const items = useAtomValue(cartItemsAtom);
  const removeItem = useSetAtom(removeItemAtom);

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
