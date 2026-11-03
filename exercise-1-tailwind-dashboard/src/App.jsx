import { DashboardHeader } from './components/DashboardHeader.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { products } from './data/products.js';

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      <Sidebar />

      <main className="px-4 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <DashboardHeader />
        <section aria-label="Product list" className="mt-6">
          <ProductGrid products={products} />
        </section>
      </main>
    </div>
  );
}
