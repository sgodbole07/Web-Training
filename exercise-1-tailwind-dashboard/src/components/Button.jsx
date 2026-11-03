import { cx } from '../lib/cx.js';

// Shared base for every button. Uses design tokens (rounded-control, bg-primary, ...)
// and state variants: enabled:hover, disabled:, focus-visible:.
const base =
  'inline-flex items-center justify-center gap-2 rounded-control px-4 py-2 text-sm font-medium ' +
  'transition-colors duration-150 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ring ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const variants = {
  primary: 'bg-primary text-on-primary enabled:hover:bg-primary-hover',
  secondary:
    'border border-border bg-surface text-ink ' +
    'enabled:hover:border-primary enabled:hover:bg-primary/5 enabled:hover:text-primary',
};

export function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button type="button" className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
