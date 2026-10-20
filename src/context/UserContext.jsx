import { createContext, use, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email } after registration

  // React 19: the context itself is the provider (no .Provider needed)
  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}

// use() can read context too, and unlike useContext it can be called conditionally
export function useUser() {
  const ctx = use(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}
