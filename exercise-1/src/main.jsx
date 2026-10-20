import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles.css';

const queryClient = new QueryClient();

async function fetchProducts(search) {
  const url = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=20`
    : 'https://dummyjson.com/products?limit=20';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  const data = await res.json();
  return data.products;
}

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: products,
    isPending,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: searchTerm
      ? ['products', { search: searchTerm }]
      : ['products'],
    queryFn: () => fetchProducts(searchTerm),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search products (e.g. phone, laptop)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => refetch()} disabled={isFetching}>
          Refresh Products
        </button>
      </div>



      {isPending && <p className="status">Loading products...</p>}

      {isFetching && !isPending && (
        <p className="fetching">Updating in the background...</p>
      )}

      {isError && (
        <p className="error">Something went wrong: {error.message}</p>
      )}

      {isSuccess && (
        <>
          <p className="success">Loaded {products.length} product(s)</p>
          {products.length === 0 ? (
            <p className="status">No products match your search.</p>
          ) : (
            <div className="grid">
              {products.map((product) => (
                <article className="card" key={product.id}>
                  <h2>{product.title}</h2>
                  <p>{product.category}</p>
                  <p className="price">${product.price}</p>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

function App() {
  const [showProducts, setShowProducts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <button className="toggle" onClick={() => setShowProducts((s) => !s)}>
          {showProducts ? 'Hide Products (unmount)' : 'Show Products (mount)'}
        </button>

        {showProducts ? (
          <ProductList />
        ) : (
          <p className="status">Products component is unmounted.</p>
        )}
      </main>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);