import { ProductCard } from './ProductCard.jsx';

// Responsive columns are handled entirely by breakpoint utilities:
// 1 column on small screens, 2 from md (768px), 3 from lg (1024px).
export function ProductGrid({ products }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
