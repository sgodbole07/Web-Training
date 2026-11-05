import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { RadioGroupField } from '../../../components/fields/RadioGroupField';
import { SectionError } from '../../../components/fields/SectionError';
import { TextField } from '../../../components/fields/TextField';
import { createEmptyPreviousCompany, createExperienceDefaults } from '../../../form/defaults';
import type { ApplicationFormValues } from '../../../schemas/applicationForm';
import { MAX_PREVIOUS_COMPANIES } from '../../../schemas/experience';

const EXPERIENCE_OPTIONS = [
  { value: 'fresher', label: 'Fresher' },
  { value: 'experienced', label: 'Experienced' },
];

const FresherFields = () => (
  <div className="step-fields">
    <TextField
      name="experience.availableFrom"
      label="Available to join from"
      type="date"
      hint="Pick the earliest date you can start, within the next 90 days"
    />
  </div>
);

const ExperiencedFields = () => {
  const { fields, append, remove } = useFieldArray({ name: 'experience.previousCompanies' });

  return (
    <div className="step-fields">
      <TextField
        name="experience.totalExperienceYears"
        label="Total experience (years)"
        inputMode="decimal"
        hint="For example 3 or 3.5"
      />
      <TextField
        name="experience.noticePeriodDays"
        label="Notice period (days)"
        inputMode="numeric"
      />
      {fields.map((field, index) => (
        <fieldset key={field.id} className="repeat-group">
          <legend>Previous company {index + 1}</legend>
          <TextField name={`experience.previousCompanies.${index}.companyName`} label="Company name" />
          <TextField name={`experience.previousCompanies.${index}.role`} label="Role" />
          <TextField name={`experience.previousCompanies.${index}.from`} label="From" type="date" />
          <TextField name={`experience.previousCompanies.${index}.to`} label="To" type="date" />
          <button type="button" className="secondary" onClick={() => remove(index)} disabled={fields.length === 1}>
            Remove company {index + 1}
          </button>
        </fieldset>
      ))}
      <SectionError name="experience.previousCompanies" />
      <button
        type="button"
        className="secondary"
        onClick={() => append(createEmptyPreviousCompany())}
        disabled={fields.length >= MAX_PREVIOUS_COMPANIES}
      >
        Add previous company
      </button>
    </div>
  );
};

export const ExperienceStep = () => {
  const { setValue, clearErrors } = useFormContext<ApplicationFormValues>();
  const experienceType = useWatch({ name: 'experience.type' });

  const handleTypeChange = (value: string) => {
    clearErrors('experience');
    setValue('experience', createExperienceDefaults(value === 'experienced' ? 'experienced' : 'fresher'));
  };

  return (
    <div className="step-fields">
      <RadioGroupField
        name="experience.type"
        legend="Are you a fresher or an experienced candidate?"
        options={EXPERIENCE_OPTIONS}
        onValueChange={handleTypeChange}
      />
      {experienceType === 'experienced' ? <ExperiencedFields /> : <FresherFields />}
    </div>
  );
};
