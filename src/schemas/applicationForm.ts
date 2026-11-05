import { z } from 'zod';
import { applicationDetailsSchema } from './applicationDetails';
import { educationSchema } from './education';
import { experienceSchema } from './experience';
import { personalDetailsSchema } from './personalDetails';

export const applicationFormSchema = z.object({
  personal: personalDetailsSchema,
  education: educationSchema,
  experience: experienceSchema,
  application: applicationDetailsSchema,
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
export type PersonalDetails = ApplicationFormValues['personal'];
export type EducationEntry = ApplicationFormValues['education'][number];
export type ExperienceDetails = ApplicationFormValues['experience'];
export type FresherExperience = Extract<ExperienceDetails, { type: 'fresher' }>;
export type ExperiencedExperience = Extract<ExperienceDetails, { type: 'experienced' }>;
export type PreviousCompany = ExperiencedExperience['previousCompanies'][number];
export type ApplicationDetails = ApplicationFormValues['application'];
