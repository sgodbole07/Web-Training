import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useUsers, useCreateUser, useDeleteUser } from './hooks.js';
import './styles.css';

const queryClient = new QueryClient();

const emptyForm = { name: '', email: '', role: 'Viewer' };

function UserForm() {
  const [form, setForm] = useState(emptyForm);
  const createUser = useCreateUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser.mutate(form, {
      onSuccess: () => setForm(emptyForm),
    });
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>

      {createUser.isPending && <p className="message">Creating user...</p>}
      {createUser.isSuccess && (
        <p className="message">User created successfully.</p>
      )}
      {createUser.isError && (
        <p className="error">{createUser.error.message}</p>
      )}
    </form>
  );
}

function UserList() {
  const { data: users, isPending, isError, error } = useUsers();
  const deleteUser = useDeleteUser();

  if (isPending) return <p className="message">Loading users...</p>;
  if (isError) return <p className="error">{error.message}</p>;

  return (
    <>
      {deleteUser.isPending && <p className="message">Deleting user...</p>}
      {deleteUser.isSuccess && (
        <p className="message">User deleted successfully.</p>
      )}
      {deleteUser.isError && (
        <p className="error">{deleteUser.error.message}</p>
      )}

      <div className="list">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <small>{user.role}</small>
            </div>
            <button onClick={() => deleteUser.mutate(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <UserForm />
        <UserList />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);