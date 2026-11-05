import { useId, type ReactNode } from 'react';
import { useFieldError } from './useFieldError';
import type { FormFieldName } from './types';

export type FieldControlProps = {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
};

type FieldShellProps = {
  name: FormFieldName;
  label: string;
  hint?: string;
  children: (control: FieldControlProps) => ReactNode;
};

export const FieldShell = ({ name, label, hint, children }: FieldShellProps) => {
  const id = useId();
  const error = useFieldError(name);
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && (
        <p id={hintId} className="hint">
          {hint}
        </p>
      )}
      <p id={errorId} role="alert" className="error">
        {error}
      </p>
    </div>
  );
};
