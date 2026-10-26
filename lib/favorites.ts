"use client";

import { useSyncExternalStore } from "react";

const KEY = "project-explorer-favorites";
const empty: string[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedValue: string[] = empty;

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY) ?? "[]";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedValue = JSON.parse(raw) as string[];
    }
    return cachedValue;
  } catch {
    return empty;
  }
}

function write(next: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => empty);

  const toggle = (id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const clear = () => write([]);

  return { favorites, toggle, clear };
}
