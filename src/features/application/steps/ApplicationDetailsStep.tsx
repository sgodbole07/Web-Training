import { CheckboxField } from '../../../components/fields/CheckboxField';
import { SelectField } from '../../../components/fields/SelectField';
import { TextAreaField } from '../../../components/fields/TextAreaField';
import { TextField } from '../../../components/fields/TextField';
import { POSITIONS } from '../../../constants/options';

const POSITION_OPTIONS = POSITIONS.map((position) => ({ value: position, label: position }));

export const ApplicationDetailsStep = () => (
  <div className="step-fields">
    <SelectField name="application.positionApplied" label="Position applied for" options={POSITION_OPTIONS} />
    <TextField
      name="application.expectedJoiningDate"
      label="Expected joining date"
      type="date"
      hint="Must be a future date within the next 180 days"
    />
    <TextField
      name="application.portfolioUrl"
      label="Portfolio link (optional)"
      type="url"
      autoComplete="url"
      hint="Starts with http:// or https://"
    />
    <TextAreaField
      name="application.coverNote"
      label="Cover note (optional)"
      rows={5}
      hint="Up to 1000 characters"
    />
    <CheckboxField
      name="application.acceptedTerms"
      label="I confirm that the information I have provided is accurate and I accept the recruitment terms"
    />
  </div>
);
