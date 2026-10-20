
const SIMULATE_CREATE_FAILURE = false;
const SIMULATE_DELETE_FAILURE = false;

let users = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', role: 'Admin' },
  { id: 2, name: 'Meera Joshi', email: 'meera@example.com', role: 'Editor' },
  { id: 3, name: 'Rohan Patil', email: 'rohan@example.com', role: 'Viewer' },
  { id: 4, name: 'Sneha Kulkarni', email: 'sneha@example.com', role: 'Editor' },
];
let nextId = users.length + 1;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUsers() {
  await delay(800);
  return [...users];
}

export async function createUser(newUser) {
  await delay(800);
  if (SIMULATE_CREATE_FAILURE) {
    throw new Error('Failed to create user. Please try again.');
  }
  const user = { id: nextId++, ...newUser };
  users = [...users, user];
  return user;
}

export async function deleteUser(id) {
  await delay(1000);
  if (SIMULATE_DELETE_FAILURE) {
    throw new Error('Failed to delete user. Please try again.');
  }
  users = users.filter((user) => user.id !== id);
  return id;
}