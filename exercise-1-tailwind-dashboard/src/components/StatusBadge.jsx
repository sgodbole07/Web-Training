import { cx } from '../lib/cx.js';

const statusStyles = {
  'in-stock': { label: 'In stock', pill: 'bg-success/10 text-success', dot: 'bg-success' },
  'low-stock': { label: 'Low stock', pill: 'bg-warning/10 text-warning', dot: 'bg-warning' },
  'out-of-stock': { label: 'Out of stock', pill: 'bg-danger/10 text-danger', dot: 'bg-danger' },
};

export function StatusBadge({ status }) {
  const style = statusStyles[status];
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        style.pill,
      )}
    >
      <span aria-hidden="true" className={cx('size-1.5 rounded-full', style.dot)} />
      {style.label}
    </span>
  );
}
