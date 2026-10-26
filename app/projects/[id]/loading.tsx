import { Skeleton, SkeletonCard } from "@/components/Skeleton";

export default function ProjectLoading() {
  return (
    <div className="stack" role="status" aria-label="Loading project">
      <div className="grid grid-4">
        <div className="card stack">
          <Skeleton width="50%" />
          <Skeleton height={28} width="40%" />
        </div>
        <div className="card stack">
          <Skeleton width="50%" />
          <Skeleton height={28} width="40%" />
        </div>
        <div className="card stack">
          <Skeleton width="50%" />
          <Skeleton height={28} width="40%" />
        </div>
      </div>
      <SkeletonCard lines={5} />
    </div>
  );
}
