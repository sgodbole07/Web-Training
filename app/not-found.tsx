import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card center-box">
      <span className="emoji">🧭</span>
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}
