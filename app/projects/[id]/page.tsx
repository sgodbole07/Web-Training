import { getProjectDetails } from "@/lib/projects";

export default async function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectDetails(id);
  const doneTasks = project.tasks.filter((task) => task.done).length;

  return (
    <div className="stack">
      <div className="grid grid-4">
        <div className="card">
          <div className="muted">Owner</div>
          <div className="stat-value" style={{ fontSize: "1.3rem" }}>
            {project.owner}
          </div>
        </div>
        <div className="card">
          <div className="muted">Deadline</div>
          <div className="stat-value" style={{ fontSize: "1.3rem" }}>
            {project.deadline}
          </div>
        </div>
        <div className="card">
          <div className="muted">Tasks completed</div>
          <div className="stat-value" style={{ fontSize: "1.3rem" }}>
            {doneTasks} / {project.tasks.length}
          </div>
        </div>
        <div className="card">
          <div className="muted">Team size</div>
          <div className="stat-value" style={{ fontSize: "1.3rem" }}>
            {project.team.length}
          </div>
        </div>
      </div>

      <section className="card">
        <h2>Progress</h2>
        <div className="progress" aria-label={`${project.progress}% complete`}>
          <span style={{ width: `${project.progress}%` }} />
        </div>
        <p className="muted" style={{ margin: "0.5rem 0 1rem" }}>
          {project.progress}% complete
        </p>
        <h3>Tags</h3>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
