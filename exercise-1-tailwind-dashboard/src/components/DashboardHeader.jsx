import { Button } from './Button.jsx';

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Products</h1>
        <p className="mt-1 text-sm text-muted">Manage your catalog and stock levels.</p>
      </div>
      <Button className="self-start sm:self-auto">+ New product</Button>
    </header>
  );
}
