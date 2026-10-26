import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  const projects = getAllProjects();

  return (
    <>
      <h1>Reports</h1>
      <p className="muted">A summary of every project with owner, deadline and task completion.</p>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Deadline</th>
              <th>Tasks</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                </td>
                <td>
                  <StatusBadge status={project.status} />
                </td>
                <td>{project.owner}</td>
                <td>{project.deadline}</td>
                <td>
                  {project.tasks.filter((task) => task.done).length}/{project.tasks.length}
                </td>
                <td>{project.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
