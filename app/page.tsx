import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects, getStats } from "@/lib/projects";

const features = [
  {
    title: "Browse projects",
    text: "Search, filter and sort every project in the organisation from one place.",
  },
  {
    title: "Dive into details",
    text: "Each project has its own overview, team, tasks, activity feed and documentation.",
  },
  {
    title: "Stay on top of work",
    text: "The dashboard streams live-style widgets so you see the essentials immediately.",
  },
];

export default function HomePage() {
  const stats = getStats();
  const featured = getAllProjects().filter((project) => project.status === "active").slice(0, 3);

  return (
    <>
      <section className="hero">
        <h1>Every project, one clear view.</h1>
        <p>
          Project Explorer is a lightweight portal for employees to browse projects, understand who is
          working on what, and keep track of progress across the organisation.
        </p>
        <div className="hero-actions">
          <Link href="/projects" className="btn btn-primary">
            Explore projects
          </Link>
          <Link href="/dashboard" className="btn">
            Open dashboard
          </Link>
        </div>
      </section>

      <section className="grid grid-4">
        <div className="card">
          <div className="stat-value">{stats.total}</div>
          <div className="muted">Total projects</div>
        </div>
        <div className="card">
          <div className="stat-value">{stats.counts.active}</div>
          <div className="muted">Active</div>
        </div>
        <div className="card">
          <div className="stat-value">{stats.counts.completed}</div>
          <div className="muted">Completed</div>
        </div>
        <div className="card">
          <div className="stat-value">{stats.averageProgress}%</div>
          <div className="muted">Average progress</div>
        </div>
      </section>

      <section className="section">
        <div className="grid grid-3">
          {features.map((feature) => (
            <div key={feature.title} className="card">
              <h3>{feature.title}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Active right now</h2>
          <Link href="/projects?status=active" className="muted">
            View all active →
          </Link>
        </div>
        <div className="grid grid-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
