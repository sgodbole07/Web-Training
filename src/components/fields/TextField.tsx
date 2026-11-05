import { useFormContext } from 'react-hook-form';
import type { ApplicationFormValues } from '../../schemas/applicationForm';
import { FieldShell } from './FieldShell';
import type { FormFieldName } from './types';

type TextFieldProps = {
  name: FormFieldName;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'url' | 'number';
  hint?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'decimal' | 'numeric';
};

export const TextField = ({
  name,
  label,
  type = 'text',
  hint,
  autoComplete,
  inputMode,
}: TextFieldProps) => {
  const { register } = useFormContext<ApplicationFormValues>();

  return (
    <FieldShell name={name} label={label} hint={hint}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          {...register(name)}
        />
      )}
    </FieldShell>
  );
};
