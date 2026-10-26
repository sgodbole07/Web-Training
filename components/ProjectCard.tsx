import Link from "next/link";
import type { Project } from "@/lib/projects";
import FavoriteButton from "./FavoriteButton";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project, query = "" }: { project: Project; query?: string }) {
  const href = `/projects/${project.id}${query ? `?${query}` : ""}`;

  return (
    <article className="card project-card">
      <div className="project-card-top">
        <StatusBadge status={project.status} />
        <FavoriteButton id={project.id} />
      </div>
      <h3>
        <Link href={href}>{project.name}</Link>
      </h3>
      <p className="muted" style={{ margin: 0 }}>
        {project.description}
      </p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div>
        <div className="progress" aria-label={`${project.progress}% complete`}>
          <span style={{ width: `${project.progress}%` }} />
        </div>
        <small className="muted">
          {project.progress}% complete · Owner {project.owner}
        </small>
      </div>
    </article>
  );
}
