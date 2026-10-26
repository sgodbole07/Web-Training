import type { Metadata } from "next";
import { getAllProjects, getStats, statuses } from "@/lib/projects";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  const stats = getStats();
  const projects = getAllProjects();

  return (
    <>
      <h1>Analytics</h1>
      <p className="muted">How work is distributed and how far along each project is.</p>

      <div className="grid grid-2">
        <section className="card">
          <h2>Projects by status</h2>
          {statuses.map((status) => {
            const count = stats.counts[status];
            return (
              <div key={status} className="bar-row">
                <span style={{ textTransform: "capitalize" }}>{status}</span>
                <div className="progress">
                  <span style={{ width: `${(count / stats.total) * 100}%` }} />
                </div>
                <strong>{count}</strong>
              </div>
            );
          })}
        </section>

        <section className="card">
          <h2>Progress by project</h2>
          {projects.map((project) => (
            <div key={project.id} className="bar-row">
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {project.name}
              </span>
              <div className="progress">
                <span style={{ width: `${project.progress}%` }} />
              </div>
              <strong>{project.progress}%</strong>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
