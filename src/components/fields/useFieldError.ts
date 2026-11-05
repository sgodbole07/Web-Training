import { useFormContext, useFormState } from 'react-hook-form';
import type { FormFieldName } from './types';

export const useFieldError = (name: FormFieldName): string | undefined => {
  const { control, getFieldState } = useFormContext();
  const formState = useFormState({ control, name });
  return getFieldState(name, formState).error?.message;
};
