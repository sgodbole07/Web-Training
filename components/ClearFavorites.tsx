"use client";

import { useFavorites } from "@/lib/favorites";

export default function ClearFavorites() {
  const { favorites, clear } = useFavorites();

  return (
    <div className="stack">
      <p className="muted" style={{ margin: 0 }}>
        You have {favorites.length} favourite {favorites.length === 1 ? "project" : "projects"}.
      </p>
      <div>
        <button type="button" className="btn" onClick={clear} disabled={favorites.length === 0}>
          Clear favourites
        </button>
      </div>
    </div>
  );
}
