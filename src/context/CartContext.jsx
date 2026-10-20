import { createContext, startTransition, use, useOptimistic, useState } from 'react';
import { addToCartApi } from '../data/cartApi.js';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // The real, confirmed cart count
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  // optimisticCount = count, plus any pending optimistic updates.
  // When the surrounding Action finishes, React drops the optimistic layer and
  // shows the real `count` again. That is what gives us the automatic rollback.
  const [optimisticCount, addOptimistic] = useOptimistic(
    count,
    (current, amount) => current + amount
  );

  // Must be called inside an Action (e.g. <form action={...}>) or startTransition.
  async function addToCart(product) {
    startTransition(() => setError(null));
    addOptimistic(1); // UI updates immediately: Cart 2 -> 3

    try {
      await addToCartApi(product.id);
      // Confirm the real state. State updates after an `await` should be wrapped
      // in startTransition so they commit together with the end of the Action.
      startTransition(() => setCount((c) => c + 1));
    } catch (err) {
      // We never touched `count`, so the optimistic +1 disappears on its own.
      startTransition(() => setError(`Couldn't add "${product.name}". ${err.message}`));
    }
  }

  const value = {
    count: optimisticCount,
    isPending: optimisticCount !== count,
    error,
    addToCart,
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
