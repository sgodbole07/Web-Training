import NavLinks from "@/components/NavLinks";
import { getAllProjects } from "@/lib/projects";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/team", label: "Team" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const projectLinks = getAllProjects()
    .slice(0, 5)
    .map((project) => ({ href: `/projects/${project.id}`, label: project.name }));

  return (
    <div className="dashboard-layout">
      <aside className="sidebar" aria-label="Dashboard">
        <div className="sidebar-title">Dashboard</div>
        <NavLinks links={dashboardLinks} linkClass="side-link" activeClass="active" exact />
        <div className="sidebar-title">Projects</div>
        <NavLinks links={projectLinks} linkClass="side-link" activeClass="active" />
      </aside>
      <section>{children}</section>
    </div>
  );
}
