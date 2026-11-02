import { assign, emit, fromPromise, setup } from 'xstate';
import { createOrder } from '../api';
import type { CartItem, CheckoutResult } from '../types';
import { getTotalPrice } from '../utils';

export interface CheckoutContext {
  items: CartItem[];
  error: string | null;
  order: CheckoutResult | null;
}

export type CheckoutEvent =
  | { type: 'CART_UPDATED'; items: CartItem[] }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' }
  | { type: 'RESET' };

export type CheckoutEmitted = { type: 'ORDER_COMPLETED'; order: CheckoutResult };

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
    emitted: {} as CheckoutEmitted,
  },
  actors: {
    // XState aborts `signal` when the invoking state is exited (e.g. on CANCEL),
    // which cancels the in-flight fetch.
    processPayment: fromPromise<CheckoutResult, { items: CartItem[] }>(({ input, signal }) =>
      createOrder(input.items, getTotalPrice(input.items), signal),
    ),
  },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
  },
}).createMachine({
  id: 'checkout',
  initial: 'reviewing',
  context: { items: [], error: null, order: null },
  on: {
    CART_UPDATED: {
      actions: assign({ items: ({ event }) => event.items }),
    },
  },
  states: {
    reviewing: {
      on: {
        SUBMIT: { guard: 'hasItems', target: 'submitting' },
      },
    },
    submitting: {
      entry: assign({ error: null }),
      invoke: {
        src: 'processPayment',
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: 'success',
          actions: assign({ order: ({ event }) => event.output }),
        },
        onError: {
          target: 'reviewing',
          actions: assign({
            error: ({ event }) =>
              event.error instanceof Error ? event.error.message : 'Payment failed',
          }),
        },
      },
      on: {
        CANCEL: 'reviewing',
      },
    },
    success: {
      entry: emit(({ context }) => ({ type: 'ORDER_COMPLETED' as const, order: context.order! })),
      on: {
        RESET: { target: 'reviewing', actions: assign({ order: null, error: null }) },
      },
    },
  },
});
