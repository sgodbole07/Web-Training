import type { Status } from "@/lib/projects";

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}
