import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const principles = [
  {
    title: "Server first",
    text: "Pages and data-heavy widgets are Server Components, so the browser receives less JavaScript.",
  },
  {
    title: "Client where it counts",
    text: "Theme switching, favourites and live filters run on the client after hydration.",
  },
  {
    title: "Resilient by design",
    text: "Loading skeletons, error boundaries and streaming keep the interface responsive when data is slow or fails.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="hero" style={{ paddingBottom: "1rem" }}>
        <h1>About Project Explorer</h1>
        <p>
          Project Explorer helps teams see what is being built, who is building it and how far along it
          is. It is intentionally small, fast and easy to extend.
        </p>
      </div>

      <div className="grid grid-3">
        {principles.map((item) => (
          <div key={item.title} className="card">
            <h3>{item.title}</h3>
            <p className="muted" style={{ margin: 0 }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <section className="section card">
        <h2>What is inside</h2>
        <ul>
          <li>A shared header and nested layouts for the dashboard and each project.</li>
          <li>Dynamic project routes with nested sections and a catch-all documentation route.</li>
          <li>URL driven search, status filtering and sorting.</li>
          <li>Suspense streaming on the dashboard with reusable loading skeletons.</li>
          <li>A local JSON dataset powering every project page.</li>
        </ul>
      </section>
    </>
  );
}
