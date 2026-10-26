import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/Skeleton";
import TeamMembers from "@/components/TeamMembers";

export const metadata: Metadata = { title: "Team" };

export const dynamic = "force-dynamic";

export default function DashboardTeamPage() {
  return (
    <>
      <h1>Team</h1>
      <p className="muted">Everyone contributing across projects and how many projects they support.</p>
      <Suspense fallback={<SkeletonCard lines={8} />}>
        <TeamMembers />
      </Suspense>
    </>
  );
}
