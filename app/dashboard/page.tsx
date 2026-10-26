import type { Metadata } from "next";
import { Suspense } from "react";
import RecentActivity from "@/components/RecentActivity";
import { SkeletonCard } from "@/components/Skeleton";
import TeamMembers from "@/components/TeamMembers";
import { getStats } from "@/lib/projects";

export const metadata: Metadata = { title: "Dashboard" };

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const stats = getStats();

  return (
    <>
      <h1>Dashboard</h1>
      <p className="muted">A snapshot of everything happening across your projects.</p>

      <div className="grid grid-4">
        <div className="card">
          <div className="stat-value">{stats.total}</div>
          <div className="muted">Projects</div>
        </div>
        <div className="card">
          <div className="stat-value">{stats.counts.active}</div>
          <div className="muted">Active</div>
        </div>
        <div className="card">
          <div className="stat-value">
            {stats.doneTasks}/{stats.totalTasks}
          </div>
          <div className="muted">Tasks done</div>
        </div>
        <div className="card">
          <div className="stat-value">{stats.averageProgress}%</div>
          <div className="muted">Avg. progress</div>
        </div>
      </div>

      <div className="grid grid-2 section">
        <Suspense fallback={<SkeletonCard lines={5} />}>
          <RecentActivity />
        </Suspense>
        <Suspense fallback={<SkeletonCard lines={5} />}>
          <TeamMembers limit={5} />
        </Suspense>
      </div>
    </>
  );
}
