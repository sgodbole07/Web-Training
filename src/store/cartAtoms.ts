import { atom } from 'jotai';
import type { CartItem, Product } from '../types';
import { getTotalItems, getTotalPrice } from '../utils';

// Primitive atom: the only piece of stored cart state.
export const cartItemsAtom = atom<CartItem[]>([]);

// Derived read-only atoms: recomputed automatically when cartItemsAtom changes,
// cached by Jotai, and never stored separately.
export const totalItemsAtom = atom((get) => getTotalItems(get(cartItemsAtom)));
export const totalPriceAtom = atom((get) => getTotalPrice(get(cartItemsAtom)));

// Write-only action atoms (read value is null).
export const addItemAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom);
  const exists = items.some((item) => item.id === product.id);
  set(
    cartItemsAtom,
    exists
      ? items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...items, { ...product, quantity: 1 }],
  );
});

export const removeItemAtom = atom(null, (get, set, id: string) => {
  set(
    cartItemsAtom,
    get(cartItemsAtom).filter((item) => item.id !== id),
  );
});

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, []);
});
