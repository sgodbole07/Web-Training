// Simulated "add to cart" request.
// Add ?cartError=1 to the URL to force a failure and see the optimistic rollback.
export function addToCartApi(productId) {
  const shouldFail = new URLSearchParams(window.location.search).has('cartError');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('The cart service is unavailable. Please try again.'));
      else resolve({ ok: true, productId });
    }, 1500);
  });
}
