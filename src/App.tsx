import { ApplicationWizard } from './features/application/ApplicationWizard';

export const App = () => (
  <main className="page">
    <header className="page-header">
      <h1>Careers portal</h1>
      <p>Complete the five steps below to apply for an open position.</p>
    </header>
    <ApplicationWizard />
  </main>
);
