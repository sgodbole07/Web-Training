type SkeletonProps = {
  width?: string | number;
  height?: string | number;
};

export function Skeleton({ width = "100%", height = 16 }: SkeletonProps) {
  return <span className="skeleton" style={{ width, height }} aria-hidden="true" />;
}

export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="stack" role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} width={index === count - 1 ? "60%" : "100%"} />
      ))}
    </div>
  );
}

export function SkeletonCard({ lines = 4 }: { lines?: number }) {
  return (
    <div className="card stack" role="status" aria-label="Loading">
      <Skeleton width="45%" height={22} />
      <SkeletonLines count={lines} />
    </div>
  );
}
