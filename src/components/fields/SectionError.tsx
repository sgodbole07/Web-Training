import { useId } from 'react';
import { useFieldError } from './useFieldError';
import type { FormFieldName } from './types';

type SectionErrorProps = {
  name: FormFieldName;
};

export const SectionError = ({ name }: SectionErrorProps) => {
  const id = useId();
  const error = useFieldError(name);

  if (!error) {
    return null;
  }

  return (
    <p id={id} role="alert" className="error">
      {error}
    </p>
  );
};
