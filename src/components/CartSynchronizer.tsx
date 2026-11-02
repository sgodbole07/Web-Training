import { useEffect } from 'react';
import { CheckoutMachineContext } from '../machines/CheckoutMachineContext';
import { useCartStore } from '../store/cartStore';

// Headless: Zustand cart -> checkout machine.
export default function CartSynchronizer() {
  const actorRef = CheckoutMachineContext.useActorRef();

  useEffect(() => {
    actorRef.send({ type: 'CART_UPDATED', items: useCartStore.getState().items });
    return useCartStore.subscribe((state, prev) => {
      if (state.items !== prev.items) actorRef.send({ type: 'CART_UPDATED', items: state.items });
    });
  }, [actorRef]);

  return null;
}
