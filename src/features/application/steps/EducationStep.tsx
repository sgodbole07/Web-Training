import { useFieldArray } from 'react-hook-form';
import { DEGREES } from '../../../constants/options';
import { SectionError } from '../../../components/fields/SectionError';
import { SelectField } from '../../../components/fields/SelectField';
import { TextField } from '../../../components/fields/TextField';
import { createEmptyEducationEntry } from '../../../form/defaults';
import { MAX_QUALIFICATIONS } from '../../../schemas/education';

const DEGREE_OPTIONS = DEGREES.map((degree) => ({ value: degree, label: degree }));

export const EducationStep = () => {
  const { fields, append, remove } = useFieldArray({ name: 'education' });

  return (
    <div className="step-fields">
      {fields.map((field, index) => (
        <fieldset key={field.id} className="repeat-group">
          <legend>Qualification {index + 1}</legend>
          <SelectField name={`education.${index}.degree`} label="Degree" options={DEGREE_OPTIONS} />
          <TextField name={`education.${index}.institution`} label="Institution" />
          <TextField name={`education.${index}.yearOfPassing`} label="Year of passing" inputMode="numeric" hint="Four digits, for example 2021" />
          <TextField name={`education.${index}.percentage`} label="Percentage" inputMode="decimal" hint="Aggregate percentage or CGPA converted to percent" />
          <button
            type="button"
            className="secondary"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            Remove qualification {index + 1}
          </button>
        </fieldset>
      ))}
      <SectionError name="education" />
      <button
        type="button"
        className="secondary"
        onClick={() => append(createEmptyEducationEntry())}
        disabled={fields.length >= MAX_QUALIFICATIONS}
      >
        Add qualification
      </button>
    </div>
  );
};
