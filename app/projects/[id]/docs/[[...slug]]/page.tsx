import Link from "next/link";

const pages: Record<string, { title: string; body: string }> = {
  setup: {
    title: "Setup",
    body: "Install dependencies, copy the example environment file and start the development server to get the project running locally.",
  },
  "setup/database": {
    title: "Database setup",
    body: "Create the database, run the migrations and load the seed data before starting the application.",
  },
  deployment: {
    title: "Deployment",
    body: "Builds are created on every merge to main and promoted to production after the checks pass.",
  },
  "api/reference": {
    title: "API reference",
    body: "Endpoints are versioned under /api/v1 and return JSON. Authentication uses bearer tokens.",
  },
};

const index = [
  { slug: "setup", label: "Setup" },
  { slug: "setup/database", label: "Database setup" },
  { slug: "deployment", label: "Deployment" },
  { slug: "api/reference", label: "API reference" },
];

function titleCase(value: string) {
  return decodeURIComponent(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type Props = { params: Promise<{ id: string; slug?: string[] }> };

export default async function DocsPage({ params }: Props) {
  const { id, slug = [] } = await params;
  const base = `/projects/${id}/docs`;
  const key = slug.join("/");
  const page = pages[key];

  if (slug.length === 0) {
    return (
      <section className="card">
        <h2>Documentation</h2>
        <p className="muted">Guides and resources for this project.</p>
        <ul className="list">
          {index.map((entry) => (
            <li key={entry.slug}>
              <Link href={`${base}/${entry.slug}`}>{entry.label}</Link>
              <code>{`${base}/${entry.slug}`}</code>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="card">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href={base}>Docs</Link>
        {slug.map((segment, position) => {
          const href = `${base}/${slug.slice(0, position + 1).join("/")}`;
          return (
            <span key={href}>
              / {position === slug.length - 1 ? titleCase(segment) : <Link href={href}>{titleCase(segment)}</Link>}
            </span>
          );
        })}
      </nav>

      <h2>{page?.title ?? titleCase(slug[slug.length - 1])}</h2>
      <p className="muted">Requested path</p>
      <p>
        <span className="path">{`${base}/${slug.join("/")}`}</span>
      </p>

      <p>{page?.body ?? "This resource page is generated from the route segments below. Add content for it to show richer documentation."}</p>

      <h3>Route segments</h3>
      <ol>
        {slug.map((segment) => (
          <li key={segment}>
            <code>{segment}</code>
          </li>
        ))}
      </ol>
    </section>
  );
}
