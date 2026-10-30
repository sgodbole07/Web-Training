import { create } from 'zustand';
import { createOrder } from '../api';
import type { CartItem, CheckoutResult, CheckoutStatus, Product } from '../types';
import { getTotalItems, getTotalPrice } from '../utils';

interface CartStore {
  items: CartItem[];
  status: CheckoutStatus;
  error: string | null;
  lastOrder: CheckoutResult | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  status: 'idle',
  error: null,
  lastOrder: null,

  addItem: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      return {
        items: exists
          ? state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  clearCart: () => set({ items: [] }),

  // Reads the current cart straight from the store via get(), not from a closure.
  checkout: async () => {
    const { items } = get();
    if (items.length === 0 || get().status === 'submitting') return;
    set({ status: 'submitting', error: null });
    try {
      const order = await createOrder(items, selectTotalPrice(get()));
      set({ status: 'success', lastOrder: order, items: [] });
    } catch (err) {
      set({ status: 'error', error: err instanceof Error ? err.message : 'Checkout failed' });
    }
  },
}));

// Derived selectors: totals are never stored, only computed from `items`.
export const selectTotalItems = (state: CartStore) => getTotalItems(state.items);
export const selectTotalPrice = (state: CartStore) => getTotalPrice(state.items);
