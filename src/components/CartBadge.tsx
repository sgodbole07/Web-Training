import { useAtomValue } from 'jotai';
import { totalItemsAtom } from '../store/cartAtoms';

// Display-only: reads a value, so useAtomValue.
export default function CartBadge() {
  const count = useAtomValue(totalItemsAtom);
  return <span className="cart-badge" aria-label="Items in cart">{count}</span>;
}
