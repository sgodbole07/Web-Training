"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const tabs = [
  { slug: "", label: "Overview" },
  { slug: "/team", label: "Team" },
  { slug: "/tasks", label: "Tasks" },
  { slug: "/activity", label: "Activity" },
  { slug: "/docs", label: "Docs" },
];

export default function ProjectTabs({ id }: { id: string }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.toString();
  const base = `/projects/${id}`;

  return (
    <nav className="tabs" aria-label="Project sections">
      {tabs.map((tab) => {
        const href = `${base}${tab.slug}`;
        const active = tab.slug === "" ? pathname === base : pathname.startsWith(href);
        return (
          <Link
            key={tab.label}
            href={query ? `${href}?${query}` : href}
            className={`tab ${active ? "active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
