import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR_CART' };

const initialState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action;
      const exists = state.items.some((item) => item.id === product.id);
      return {
        items: exists
          ? state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [...state.items, { ...product, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.id !== action.id) };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

// Split contexts: dispatch is referentially stable, so components that only
// consume it never re-render when the cart state changes.
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState(): CartState {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined) throw new Error('useCartState must be used within a CartProvider');
  return ctx;
}

export function useCartDispatch(): Dispatch<CartAction> {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined) throw new Error('useCartDispatch must be used within a CartProvider');
  return ctx;
}
