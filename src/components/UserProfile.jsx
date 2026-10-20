import { useUser } from '../context/UserContext.jsx';

// Reads the registered user from Context, in a different component from the form
export default function UserProfile() {
  const { user } = useUser();

  if (!user) return <p className="muted">Browsing as guest</p>;

  return (
    <div className="profile">
      <span className="avatar" aria-hidden="true">{user.name[0].toUpperCase()}</span>
      <div>
        <strong>{user.name}</strong>
        <div className="muted small-text">{user.email}</div>
      </div>
    </div>
  );
}
