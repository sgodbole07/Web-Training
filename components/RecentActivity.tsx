import Link from "next/link";
import { getRecentActivity } from "@/lib/projects";

export default async function RecentActivity() {
  const items = await getRecentActivity();

  return (
    <div className="card">
      <h2>Recent activity</h2>
      <ul className="list">
        {items.map((item) => (
          <li key={`${item.projectId}-${item.id}`}>
            <div>
              <div>{item.text}</div>
              <Link href={`/projects/${item.projectId}`} className="muted">
                {item.project}
              </Link>
            </div>
            <small className="muted">{item.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
