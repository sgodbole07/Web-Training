import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import type { ApplicationFormValues } from '../../schemas/applicationForm';
import { useFieldError } from './useFieldError';
import type { ChoiceOption, FormFieldName } from './types';

type RadioGroupFieldProps = {
  name: FormFieldName;
  legend: string;
  options: readonly ChoiceOption[];
  onValueChange?: (value: string) => void;
};

export const RadioGroupField = ({ name, legend, options, onValueChange }: RadioGroupFieldProps) => {
  const { register } = useFormContext<ApplicationFormValues>();
  const id = useId();
  const errorId = `${id}-error`;
  const error = useFieldError(name);

  return (
    <fieldset className="field radio-group">
      <legend>{legend}</legend>
      {options.map((option) => {
        const optionId = `${id}-${option.value}`;
        return (
          <div key={option.value} className="checkbox-row">
            <input
              id={optionId}
              type="radio"
              value={option.value}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              {...register(name, {
                onChange: (event: { target: { value: string } }) => onValueChange?.(event.target.value),
              })}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        );
      })}
      <p id={errorId} role="alert" className="error">
        {error}
      </p>
    </fieldset>
  );
};
