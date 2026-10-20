import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useUser } from '../context/UserContext.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, password }) {
  const errors = {};
  if (name.length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
  return errors;
}

// useFormStatus only works in a component rendered INSIDE the <form>
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending} aria-busy={pending}>
      {pending ? 'Creating account…' : 'Create account'}
    </button>
  );
}

const initialState = { status: 'idle', errors: {}, values: { name: '', email: '' } };

export default function RegisterForm() {
  const { user, setUser } = useUser();

  // Receives (previousState, formData) and returns the next state
  async function registerAction(_prev, formData) {
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
    };
    const password = String(formData.get('password') ?? '');

    const errors = validate({ ...values, password });
    if (Object.keys(errors).length) return { status: 'error', errors, values };

    // Simulated API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (values.email.toLowerCase() === 'taken@example.com') {
      return { status: 'error', errors: { email: 'This email is already registered.' }, values };
    }

    setUser(values); // store in Context (never store the password)
    return { status: 'success', errors: {}, values };
  }

  const [state, formAction] = useActionState(registerAction, initialState);

  if (user) {
    return (
      <section className="panel" aria-live="polite">
        <h2>You're in</h2>
        <p className="success">Registration successful. Welcome, {user.name}!</p>
      </section>
    );
  }

  const { errors, values } = state;

  return (
    <section className="panel">
      <h2>Create your account</h2>
      <form action={formAction} noValidate>
        <label>
          Name
          <input name="name" type="text" autoComplete="name" defaultValue={values.name} aria-invalid={Boolean(errors.name)} />
          {errors.name && <span className="error" role="alert">{errors.name}</span>}
        </label>

        <label>
          Email
          <input name="email" type="email" autoComplete="email" defaultValue={values.email} aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="error" role="alert">{errors.email}</span>}
        </label>

        <label>
          Password
          <input name="password" type="password" autoComplete="new-password" aria-invalid={Boolean(errors.password)} />
          {errors.password && <span className="error" role="alert">{errors.password}</span>}
        </label>

        <SubmitButton />
      </form>
    </section>
  );
}
