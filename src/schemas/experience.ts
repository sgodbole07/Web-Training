import { z } from 'zod';
import { isDateOnOrBefore, isDateWithinDays, parseIsoDate, startOfToday } from '../lib/dates';
import { isoDateField } from './common';

export const MAX_PREVIOUS_COMPANIES = 10;

const pastDateField = (label: string) =>
  isoDateField(label).refine(
    (value) => isDateOnOrBefore(value, startOfToday()),
    `${label} cannot be in the future`,
  );

export const previousCompanySchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(2, 'Enter the company name')
      .max(120, 'Company name must be 120 characters or fewer'),
    role: z
      .string()
      .trim()
      .min(2, 'Enter your role')
      .max(80, 'Role must be 80 characters or fewer'),
    from: pastDateField('Start date'),
    to: pastDateField('End date'),
  })
  .refine(
    (company) => {
      const from = parseIsoDate(company.from);
      const to = parseIsoDate(company.to);
      return !from || !to || to.getTime() > from.getTime();
    },
    { message: 'End date must be after the start date', path: ['to'] },
  );

export const previousCompaniesSchema = z
  .array(previousCompanySchema)
  .min(1, 'Add at least one previous company')
  .max(MAX_PREVIOUS_COMPANIES, `You can add up to ${MAX_PREVIOUS_COMPANIES} companies`)
  .superRefine((companies, ctx) => {
    const ranges = companies.flatMap((company, index) => {
      const from = parseIsoDate(company.from);
      const to = parseIsoDate(company.to);
      return from && to && to.getTime() > from.getTime() ? [{ index, from, to }] : [];
    });
    ranges.forEach((later) => {
      const overlaps = ranges.some(
        (earlier) =>
          earlier.index !== later.index &&
          earlier.from.getTime() < later.from.getTime() &&
          later.from.getTime() < earlier.to.getTime(),
      );
      if (overlaps) {
        ctx.addIssue({
          code: 'custom',
          path: [later.index, 'from'],
          message: 'These dates overlap with another company',
        });
      }
    });
  });

const fresherExperienceSchema = z.object({
  type: z.literal('fresher'),
  availableFrom: isoDateField('Availability date').refine(
    (value) => isDateWithinDays(value, 0, 90),
    'Availability must be today or within the next 90 days',
  ),
});

const experiencedExperienceSchema = z.object({
  type: z.literal('experienced'),
  totalExperienceYears: z
    .string()
    .regex(/^\d{1,2}(\.\d)?$/, 'Enter years such as 2 or 2.5')
    .refine((value) => Number(value) > 0 && Number(value) <= 50, 'Enter a value above 0 and up to 50'),
  noticePeriodDays: z
    .string()
    .regex(/^\d{1,3}$/, 'Enter the notice period in whole days')
    .refine((value) => Number(value) <= 180, 'Notice period cannot exceed 180 days'),
  previousCompanies: previousCompaniesSchema,
});

export const experienceSchema = z.discriminatedUnion('type', [
  fresherExperienceSchema,
  experiencedExperienceSchema,
]);
