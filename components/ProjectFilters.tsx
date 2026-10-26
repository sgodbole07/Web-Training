"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusOptions = ["all", "active", "completed", "on-hold"];

export default function ProjectFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const status = params.get("status") ?? "all";
  const sort = params.get("sort") ?? "";

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function update(key: string, value: string) {
    const next = new URLSearchParams(window.location.search);
    if (value && value !== "all") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const query = next.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  function onSearch(value: string) {
    setSearch(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => update("search", value.trim()), 300);
  }

  return (
    <div className="filters" aria-busy={isPending}>
      <input
        type="search"
        className="input"
        placeholder="Search projects, tags or descriptions"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        aria-label="Search projects"
      />
      <div className="chips" role="group" aria-label="Filter by status">
        {statusOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip ${status === option ? "active" : ""}`}
            onClick={() => update("status", option)}
          >
            {option}
          </button>
        ))}
      </div>
      <select
        className="select"
        value={sort}
        onChange={(event) => update("sort", event.target.value)}
        aria-label="Sort projects"
      >
        <option value="">Sort: Default</option>
        <option value="name">Sort: Name</option>
        <option value="progress">Sort: Progress</option>
        <option value="deadline">Sort: Deadline</option>
      </select>
    </div>
  );
}
