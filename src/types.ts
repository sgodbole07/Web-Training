export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/** Order returned by POST /api/orders (201 Created). */
export interface CheckoutResult {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';
