import data from "@/data/projects.json";

export type Status = "active" | "completed" | "on-hold";
export type Member = { name: string; role: string };
export type Task = { id: number; title: string; assignee: string; done: boolean };
export type ActivityItem = { id: number; text: string; date: string };
export type Project = {
  id: string;
  name: string;
  description: string;
  status: Status;
  progress: number;
  owner: string;
  deadline: string;
  tags: string[];
  team: Member[];
  tasks: Task[];
  activity: ActivityItem[];
};

export type Filters = { search?: string; status?: string; sort?: string };

const projects = data as Project[];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const statuses: Status[] = ["active", "completed", "on-hold"];

export function filterProjects({ search, status, sort }: Filters): Project[] {
  const term = search?.trim().toLowerCase();
  let result = projects.filter((project) => {
    const matchesSearch =
      !term ||
      project.name.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tags.some((tag) => tag.toLowerCase().includes(term));
    const matchesStatus = !status || status === "all" || project.status === status;
    return matchesSearch && matchesStatus;
  });

  if (sort === "name") {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "progress") {
    result = [...result].sort((a, b) => b.progress - a.progress);
  } else if (sort === "deadline") {
    result = [...result].sort((a, b) => a.deadline.localeCompare(b.deadline));
  }

  return result;
}

export function getAllProjects(): Project[] {
  return projects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  return projects.find((project) => project.id === id);
}

export async function getProjectDetails(id: string): Promise<Project> {
  await wait(1500);
  const project = projects.find((item) => item.id === id);
  if (!project) {
    throw new Error("Project not found");
  }
  if (project.id === "8" && Math.random() < 0.6) {
    throw new Error("The inventory service did not respond");
  }
  return project;
}

export async function getRecentActivity() {
  await wait(2500);
  return projects
    .flatMap((project) =>
      project.activity.map((item) => ({ ...item, project: project.name, projectId: project.id })),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);
}

export async function getTeamMembers() {
  await wait(3500);
  const map = new Map<string, { name: string; role: string; projects: number }>();
  for (const project of projects) {
    for (const member of project.team) {
      const existing = map.get(member.name);
      if (existing) {
        existing.projects += 1;
      } else {
        map.set(member.name, { ...member, projects: 1 });
      }
    }
  }
  return [...map.values()].sort((a, b) => b.projects - a.projects);
}

export function getStats() {
  const total = projects.length;
  const counts = {
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
    "on-hold": projects.filter((p) => p.status === "on-hold").length,
  };
  const averageProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total);
  const tasks = projects.flatMap((p) => p.tasks);
  const doneTasks = tasks.filter((t) => t.done).length;
  return { total, counts, averageProgress, totalTasks: tasks.length, doneTasks };
}
