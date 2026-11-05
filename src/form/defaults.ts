import type {
  ApplicationFormValues,
  EducationEntry,
  ExperienceDetails,
  PreviousCompany,
} from '../schemas/applicationForm';

export const createEmptyEducationEntry = (): EducationEntry => ({
  degree: '',
  institution: '',
  yearOfPassing: '',
  percentage: '',
});

export const createEmptyPreviousCompany = (): PreviousCompany => ({
  companyName: '',
  role: '',
  from: '',
  to: '',
});

export const createExperienceDefaults = (type: ExperienceDetails['type']): ExperienceDetails =>
  type === 'fresher'
    ? { type: 'fresher', availableFrom: '' }
    : {
        type: 'experienced',
        totalExperienceYears: '',
        noticePeriodDays: '',
        previousCompanies: [createEmptyPreviousCompany()],
      };

export const createDefaultValues = (): ApplicationFormValues => ({
  personal: {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    currentCity: '',
  },
  education: [createEmptyEducationEntry()],
  experience: createExperienceDefaults('fresher'),
  application: {
    positionApplied: '',
    expectedJoiningDate: '',
    portfolioUrl: '',
    coverNote: '',
    acceptedTerms: false,
  },
});
