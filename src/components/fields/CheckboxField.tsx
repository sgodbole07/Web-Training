import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import type { ApplicationFormValues } from '../../schemas/applicationForm';
import { useFieldError } from './useFieldError';
import type { FormFieldName } from './types';

type CheckboxFieldProps = {
  name: FormFieldName;
  label: string;
};

export const CheckboxField = ({ name, label }: CheckboxFieldProps) => {
  const { register } = useFormContext<ApplicationFormValues>();
  const id = useId();
  const errorId = `${id}-error`;
  const error = useFieldError(name);

  return (
    <div className="field checkbox">
      <div className="checkbox-row">
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...register(name)}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <p id={errorId} role="alert" className="error">
        {error}
      </p>
    </div>
  );
};
