import { getTeamMembers } from "@/lib/projects";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default async function TeamMembers({ limit }: { limit?: number }) {
  const all = await getTeamMembers();
  const members = limit ? all.slice(0, limit) : all;

  return (
    <div className="card">
      <h2>Team members</h2>
      <ul className="list">
        {members.map((member) => (
          <li key={member.name}>
            <div className="person">
              <span className="avatar">{initials(member.name)}</span>
              <div>
                <div>{member.name}</div>
                <small className="muted">{member.role}</small>
              </div>
            </div>
            <small className="muted">
              {member.projects} {member.projects === 1 ? "project" : "projects"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
