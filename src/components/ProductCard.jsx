export default function ProductCard({ product, canBuy, onAdd }) {
  return (
    <article className="card">
      <img src={product.image} alt={product.name} width="400" height="260" loading="lazy" />
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="card-foot">
          <strong>${product.price.toFixed(2)}</strong>
          <button
            type="button"
            className="btn small"
            disabled={!canBuy}
            title={canBuy ? '' : 'Register to add items'}
            onClick={() => onAdd(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
