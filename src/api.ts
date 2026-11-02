import type { CartItem, CheckoutResult, Product } from './types';

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch('/api/products', { signal });
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
  return res.json();
}

export async function createOrder(
  items: CartItem[],
  total: number,
  signal?: AbortSignal,
): Promise<CheckoutResult> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, total, createdAt: new Date().toISOString() }),
    signal,
  });
  if (!res.ok) throw new Error(`Checkout failed (${res.status})`);
  return res.json();
}
