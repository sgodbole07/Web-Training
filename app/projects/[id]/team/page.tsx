import { getProjectDetails } from "@/lib/projects";

export default async function ProjectTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectDetails(id);

  return (
    <section className="card">
      <h2>Team</h2>
      <ul className="list">
        {project.team.map((member) => (
          <li key={member.name}>
            <div className="person">
              <span className="avatar">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <div>{member.name}</div>
                <small className="muted">{member.role}</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
