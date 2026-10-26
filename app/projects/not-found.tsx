import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="card center-box">
      <span className="emoji">📂</span>
      <h1>Project not found</h1>
      <p className="muted">We could not find a project with that ID. It may have been removed or the link is incorrect.</p>
      <Link href="/projects" className="btn btn-primary">
        Browse all projects
      </Link>
    </div>
  );
}
