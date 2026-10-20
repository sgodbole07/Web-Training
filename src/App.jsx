import { Suspense, useState } from 'react';
import { UserProvider, useUser } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { fetchProducts } from './data/products.js';
import { HERO_IMAGE, initAssetHints } from './assetHints.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import UserProfile from './components/UserProfile.jsx';
import CartBadge from './components/CartBadge.jsx';

function Skeleton() {
  return (
    <div className="grid" role="status" aria-label="Loading products">
      {Array.from({ length: 4 }, (_, i) => (
        <div className="card skeleton" key={i} />
      ))}
    </div>
  );
}

function Store() {
  initAssetHints(); // Asset Loading APIs
  const { user } = useUser();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Create the Promise once and keep it in state so it is stable across renders.
  const [productsPromise, setProductsPromise] = useState(fetchProducts);

  const title = selectedProduct
    ? `Mini E-Commerce Store – ${selectedProduct.name}`
    : user
      ? `Mini E-Commerce Store – Welcome, ${user.name}`
      : 'Mini E-Commerce Store – Products';

  return (
    <>
      {/* Document Metadata: React hoists these into <head> */}
      <title>{title}</title>
      <meta
        name="description"
        content={
          selectedProduct
            ? selectedProduct.description
            : 'Browse our catalogue of audio gear, outdoor equipment and home essentials. Register to start shopping.'
        }
      />

      <header className="topbar">
        <h1>Mini Store</h1>
        <div className="topbar-right">
          <CartBadge />
          <UserProfile />
        </div>
      </header>

      <img className="hero" src={HERO_IMAGE} alt="" width="1200" height="320" />

      <main className="layout">
        <aside>
          <RegisterForm />
        </aside>

        <section>
          {selectedProduct ? (
            <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : (
            <>
              <h2>Products</h2>
              <ErrorBoundary
                onReset={() => setProductsPromise(fetchProducts())}
                fallback={(error, reset) => (
                  <div className="panel" role="alert">
                    <p className="error">Couldn't load products: {error.message}</p>
                    <button className="btn small" onClick={reset}>Try again</button>
                  </div>
                )}
              >
                <Suspense fallback={<Skeleton />}>
                  <ProductList productsPromise={productsPromise} onSelect={setSelectedProduct} />
                </Suspense>
              </ErrorBoundary>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Store />
      </CartProvider>
    </UserProvider>
  );
}
