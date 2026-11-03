import { Button } from './Button.jsx';
import { StatusBadge } from './StatusBadge.jsx';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function ProductCard({ product }) {
  const { name, category, price, status, id } = product;
  const unavailable = status === 'out-of-stock';

  return (
    <article className="group flex flex-col overflow-hidden rounded-card bg-surface shadow-card transition-shadow duration-200 hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-border">
        <img
          src={`https://picsum.photos/seed/product${id}/600/450`}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">{category}</p>
            <h2 className="truncate text-base font-semibold text-ink">{name}</h2>
          </div>
          <StatusBadge status={status} />
        </div>

        <p className="text-lg font-bold text-ink">{currency.format(price)}</p>

        <div className="mt-auto pt-2">
          <Button
            variant={unavailable ? 'secondary' : 'primary'}
            disabled={unavailable}
            className="w-full"
            aria-label={`${unavailable ? 'Unavailable' : 'Add'} ${name}${unavailable ? '' : ' to cart'}`}
          >
            {unavailable ? 'Unavailable' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </article>
  );
}
