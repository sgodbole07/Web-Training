import type { ApplicationFormValues } from '../schemas/applicationForm';

export type FormSection = keyof ApplicationFormValues;

export type WizardStep = {
  title: string;
  sections: readonly FormSection[];
};

export const WIZARD_STEPS: readonly WizardStep[] = [
  { title: 'Personal details', sections: ['personal'] },
  { title: 'Education', sections: ['education'] },
  { title: 'Experience', sections: ['experience'] },
  { title: 'Application details', sections: ['application'] },
  { title: 'Review and submit', sections: [] },
];

export const REVIEW_STEP_INDEX = WIZARD_STEPS.length - 1;

export const stepIndexForSection = (section: string): number =>
  WIZARD_STEPS.findIndex((step) => (step.sections as readonly string[]).includes(section));
