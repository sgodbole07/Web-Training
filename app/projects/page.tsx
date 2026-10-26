import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
import { filterProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const search = first(params.search);
  const status = first(params.status);
  const sort = first(params.sort);

  const projects = filterProjects({ search, status, sort });

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (status) query.set("status", status);
  if (sort) query.set("sort", sort);
  const queryString = query.toString();

  return (
    <>
      <h1>Projects</h1>
      <p className="muted">Browse every project, then open one to see its team, tasks and activity.</p>

      <Suspense fallback={<div className="filters" />}>
        <ProjectFilters />
      </Suspense>

      <p className="muted" aria-live="polite">
        Showing {projects.length} {projects.length === 1 ? "project" : "projects"}
      </p>

      {projects.length === 0 ? (
        <div className="card center-box">
          <span className="emoji">🔍</span>
          <h2>No projects match your filters</h2>
          <p className="muted">Try a different search term or clear the status filter.</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} query={queryString} />
          ))}
        </div>
      )}
    </>
  );
}
