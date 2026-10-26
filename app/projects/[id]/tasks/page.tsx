import { getProjectDetails } from "@/lib/projects";

export default async function ProjectTasksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectDetails(id);

  return (
    <section className="card">
      <h2>Tasks</h2>
      <ul className="list">
        {project.tasks.map((task) => (
          <li key={task.id}>
            <div>
              <div className={task.done ? "task-done" : ""}>{task.title}</div>
              <small className="muted">Assigned to {task.assignee}</small>
            </div>
            <span className={`badge ${task.done ? "badge-completed" : "badge-active"}`}>
              {task.done ? "Done" : "In progress"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
