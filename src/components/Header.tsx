import Toolbar from './Toolbar';

export default function Header({ onToggleCart }: { onToggleCart: () => void }) {
  return (
    <header className="header">
      <h1>ShopCart</h1>
      <Toolbar onToggleCart={onToggleCart} />
    </header>
  );
}
