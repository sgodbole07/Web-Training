import { z } from 'zod';
import { DEGREES } from '../constants/options';
import { choiceField } from './common';

const MIN_PASSING_YEAR = 1960;
export const MAX_QUALIFICATIONS = 6;

export const educationEntrySchema = z.object({
  degree: choiceField(DEGREES, 'Select a degree'),
  institution: z
    .string()
    .trim()
    .min(2, 'Enter the institution name')
    .max(120, 'Institution name must be 120 characters or fewer'),
  yearOfPassing: z
    .string()
    .regex(/^\d{4}$/, 'Enter a four-digit year')
    .refine((value) => {
      const year = Number(value);
      return year >= MIN_PASSING_YEAR && year <= new Date().getFullYear();
    }, `Year must be between ${MIN_PASSING_YEAR} and the current year`),
  percentage: z
    .string()
    .regex(/^\d{1,3}(\.\d{1,2})?$/, 'Enter a percentage such as 78.5')
    .refine((value) => Number(value) <= 100, 'Percentage cannot exceed 100'),
});

export const educationSchema = z
  .array(educationEntrySchema)
  .min(1, 'Add at least one qualification')
  .max(MAX_QUALIFICATIONS, `You can add up to ${MAX_QUALIFICATIONS} qualifications`)
  .superRefine((entries, ctx) => {
    const seen = new Set<string>();
    entries.forEach((entry, index) => {
      const key = [entry.degree, entry.institution.trim().toLowerCase(), entry.yearOfPassing].join('|');
      if (seen.has(key)) {
        ctx.addIssue({
          code: 'custom',
          path: [index, 'degree'],
          message: 'This qualification is already listed',
        });
        return;
      }
      seen.add(key);
    });
  });
