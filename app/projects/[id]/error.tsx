"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ProjectError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function retry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <div className="card center-box" role="alert">
      <span className="emoji">⚠️</span>
      <h2>We could not load this project</h2>
      <p className="muted">Something went wrong while fetching the project data. The rest of the app is still working, so you can try again.</p>
      <button type="button" className="btn btn-primary" onClick={retry} disabled={isPending}>
        {isPending ? "Retrying..." : "Try again"}
      </button>
    </div>
  );
}
