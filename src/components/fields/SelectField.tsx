import { useFormContext } from 'react-hook-form';
import type { ApplicationFormValues } from '../../schemas/applicationForm';
import { FieldShell } from './FieldShell';
import type { ChoiceOption, FormFieldName } from './types';

type SelectFieldProps = {
  name: FormFieldName;
  label: string;
  options: readonly ChoiceOption[];
  placeholder?: string;
};

export const SelectField = ({
  name,
  label,
  options,
  placeholder = 'Select an option',
}: SelectFieldProps) => {
  const { register } = useFormContext<ApplicationFormValues>();

  return (
    <FieldShell name={name} label={label}>
      {({ id, describedBy, invalid }) => (
        <select id={id} aria-invalid={invalid} aria-describedby={describedBy} {...register(name)}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
};
