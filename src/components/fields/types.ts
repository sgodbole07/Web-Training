import type { FieldPath } from 'react-hook-form';
import type { ApplicationFormValues } from '../../schemas/applicationForm';

export type FormFieldName = FieldPath<ApplicationFormValues>;

export type ChoiceOption = {
  value: string;
  label: string;
};
