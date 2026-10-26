import { getProjectDetails } from "@/lib/projects";

export default async function ProjectActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectDetails(id);

  return (
    <section className="card">
      <h2>Activity</h2>
      <ul className="list">
        {project.activity.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <small className="muted">{item.date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
