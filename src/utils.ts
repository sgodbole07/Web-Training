import type { CartItem } from './types';

export const getTotalItems = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;
