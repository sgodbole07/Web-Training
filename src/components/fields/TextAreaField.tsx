import { useFormContext } from 'react-hook-form';
import type { ApplicationFormValues } from '../../schemas/applicationForm';
import { FieldShell } from './FieldShell';
import type { FormFieldName } from './types';

type TextAreaFieldProps = {
  name: FormFieldName;
  label: string;
  rows?: number;
  hint?: string;
};

export const TextAreaField = ({ name, label, rows = 4, hint }: TextAreaFieldProps) => {
  const { register } = useFormContext<ApplicationFormValues>();

  return (
    <FieldShell name={name} label={label} hint={hint}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          {...register(name)}
        />
      )}
    </FieldShell>
  );
};
