import { createActorContext } from '@xstate/react';
import { checkoutMachine } from './checkoutMachine';

// One actor, created by CheckoutMachineContext.Provider, shared by every sibling component.
export const CheckoutMachineContext = createActorContext(checkoutMachine);
