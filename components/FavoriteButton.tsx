"use client";

import { useFavorites } from "@/lib/favorites";

export default function FavoriteButton({ id }: { id: string }) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.includes(id);

  return (
    <button
      type="button"
      className={`fav-btn ${active ? "on" : ""}`}
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      title={active ? "Remove from favourites" : "Add to favourites"}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
