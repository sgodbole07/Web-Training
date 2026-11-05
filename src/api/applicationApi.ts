import type { ApplicationFormValues } from '../schemas/applicationForm';

export type ServerFieldError = {
  field: string;
  message: string;
};

export class ApplicationValidationError extends Error {
  readonly fieldErrors: ServerFieldError[];

  constructor(fieldErrors: ServerFieldError[]) {
    super('The server rejected one or more fields');
    this.name = 'ApplicationValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export class ApplicationServerError extends Error {
  constructor() {
    super('The server could not process the application');
    this.name = 'ApplicationServerError';
  }
}

export type SubmitApplicationResult = {
  applicationId: string;
};

const SIMULATED_LATENCY_MS = 1500;

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const submitApplication = async (
  payload: ApplicationFormValues,
): Promise<SubmitApplicationResult> => {
  await wait(SIMULATED_LATENCY_MS);

  const email = payload.personal.email.toLowerCase();

  if (email.endsWith('@validation.test')) {
    throw new ApplicationValidationError([
      { field: 'personal.email', message: 'This email address has already applied for a position' },
    ]);
  }

  if (email.endsWith('@server.test')) {
    throw new ApplicationServerError();
  }

  return { applicationId: `APP-${Date.now().toString(36).toUpperCase()}` };
};
