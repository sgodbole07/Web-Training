import { useEffect } from 'react';
import { CheckoutMachineContext } from '../machines/CheckoutMachineContext';
import { useCartStore } from '../store/cartStore';

// Headless: checkout machine -> Zustand. Keeps store mutations out of the machine definition.
export default function OrderCompletionBridge() {
  const actorRef = CheckoutMachineContext.useActorRef();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const subscription = actorRef.on('ORDER_COMPLETED', () => clearCart());
    return () => subscription.unsubscribe();
  }, [actorRef, clearCart]);

  return null;
}
