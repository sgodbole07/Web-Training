import { cx } from '../lib/cx.js';

const links = ['Dashboard', 'Products', 'Orders', 'Customers', 'Settings'];

// Adaptive navigation:
//  - below lg: a full-width top bar whose links scroll horizontally
//  - lg and up: a fixed vertical sidebar
// aria-[current=page] is an ARIA state variant, so the active link is styled from its
// aria-current attribute and needs no JavaScript state.
const linkClass =
  'shrink-0 whitespace-nowrap rounded-control px-3 py-2 text-sm font-medium text-muted ' +
  'transition-colors hover:bg-background hover:text-ink ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ring ' +
  'aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary';

export function Sidebar() {
  return (
    <aside
      className={cx(
        'border-b border-border bg-surface',
        'lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-r lg:border-b-0',
      )}
    >
      <div className="flex items-center gap-2 px-4 pt-4 lg:px-6 lg:pt-6">
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-control bg-primary font-bold text-on-primary">
          S
        </span>
        <span className="font-semibold text-ink">Shopfloor</span>
      </div>

      <nav aria-label="Main" className="flex gap-1 overflow-x-auto p-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-6">
        {links.map((label, index) => (
          <a
            key={label}
            href="#"
            aria-current={index === 1 ? 'page' : undefined}
            className={linkClass}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
