import type { Metadata } from "next";
import ClearFavorites from "@/components/ClearFavorites";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <h1>Settings</h1>
      <p className="muted">Personalise how Project Explorer looks and behaves on this device.</p>

      <div className="grid grid-2">
        <section className="card stack">
          <h2>Appearance</h2>
          <p className="muted" style={{ margin: 0 }}>
            Switch between light and dark themes. Your choice is remembered in this browser.
          </p>
          <div>
            <ThemeToggle />
          </div>
        </section>

        <section className="card stack">
          <h2>Favourites</h2>
          <ClearFavorites />
        </section>
      </div>
    </>
  );
}
