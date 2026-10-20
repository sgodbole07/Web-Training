const img = (seed) => `https://picsum.photos/seed/${seed}/400/260`;

const PRODUCTS = [
  { id: 1, name: 'Aero Wireless Headphones', price: 89.99, category: 'Audio', image: img('headphones'), description: 'Over-ear, 30-hour battery and active noise cancelling.' },
  { id: 2, name: 'Trailblazer Backpack', price: 54.5, category: 'Outdoor', image: img('backpack'), description: 'Water-resistant 25L pack with a padded laptop sleeve.' },
  { id: 3, name: 'Brew Master Kettle', price: 39.0, category: 'Home', image: img('kettle'), description: 'Gooseneck kettle with temperature control for pour-over.' },
  { id: 4, name: 'Pulse Fitness Band', price: 49.99, category: 'Wearables', image: img('fitnessband'), description: 'Heart-rate, sleep tracking and 10-day battery life.' },
  { id: 5, name: 'Lumen Desk Lamp', price: 29.95, category: 'Home', image: img('desklamp'), description: 'Dimmable LED lamp with three colour temperatures.' },
  { id: 6, name: 'Nomad Mechanical Keyboard', price: 109.0, category: 'Accessories', image: img('keyboard'), description: 'Compact 75% board with hot-swappable switches.' },
  { id: 7, name: 'Summit Water Bottle', price: 24.0, category: 'Outdoor', image: img('bottle'), description: 'Insulated steel bottle, keeps drinks cold for 24 hours.' },
  { id: 8, name: 'Orbit Bluetooth Speaker', price: 64.99, category: 'Audio', image: img('speaker'), description: 'Pocket-size speaker with deep bass and IP67 rating.' },
];

// Simulated API. Add ?error=1 to the URL to test the error state.
export function fetchProducts() {
  const shouldFail = new URLSearchParams(window.location.search).has('error');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Could not reach the product service.'));
      else resolve(PRODUCTS);
    }, 2000);
  });
}
