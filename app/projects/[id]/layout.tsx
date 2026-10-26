import { notFound } from "next/navigation";
import { Suspense } from "react";
import BackLink from "@/components/BackLink";
import FavoriteButton from "@/components/FavoriteButton";
import ProjectTabs from "@/components/ProjectTabs";
import StatusBadge from "@/components/StatusBadge";
import { getProject } from "@/lib/projects";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  return { title: project?.name ?? "Project" };
}

export default async function ProjectLayout({ children, params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={null}>
        <BackLink />
      </Suspense>
      <div className="project-header">
        <div>
          <div className="project-title">
            <h1 style={{ margin: 0 }}>{project.name}</h1>
            <StatusBadge status={project.status} />
            <FavoriteButton id={project.id} />
          </div>
          <p className="muted" style={{ margin: "0.5rem 0 0" }}>
            {project.description}
          </p>
        </div>
      </div>
      <Suspense fallback={<nav className="tabs" aria-hidden="true" />}>
        <ProjectTabs id={id} />
      </Suspense>
      {children}
    </>
  );
}
