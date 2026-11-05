import { TextField } from '../../../components/fields/TextField';

export const PersonalDetailsStep = () => (
  <div className="step-fields">
    <TextField name="personal.fullName" label="Full name" autoComplete="name" />
    <TextField name="personal.email" label="Email" type="email" autoComplete="email" />
    <TextField name="personal.phone" label="Phone" type="tel" autoComplete="tel" hint="Digits only, 10 to 15, optionally starting with +" />
    <TextField name="personal.dateOfBirth" label="Date of birth" type="date" autoComplete="bday" />
    <TextField name="personal.currentCity" label="Current city" autoComplete="address-level2" />
  </div>
);
