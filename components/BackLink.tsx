"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BackLink() {
  const params = useSearchParams();
  const query = params.toString();

  return (
    <Link href={query ? `/projects?${query}` : "/projects"} className="back-link">
      ← Back to projects
    </Link>
  );
}
