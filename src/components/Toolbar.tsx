import CartBadge from './CartBadge';

export default function Toolbar({ onToggleCart }: { onToggleCart: () => void }) {
  return (
    <div className="toolbar">
      <button className="btn btn-secondary" onClick={onToggleCart}>
        Cart <CartBadge />
      </button>
    </div>
  );
}
