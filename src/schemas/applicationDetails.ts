import { z } from 'zod';
import { POSITIONS } from '../constants/options';
import { isDateWithinDays } from '../lib/dates';
import { choiceField, isHttpUrl, isoDateField } from './common';

export const applicationDetailsSchema = z.object({
  positionApplied: choiceField(POSITIONS, 'Select the position you are applying for'),
  expectedJoiningDate: isoDateField('Expected joining date').refine(
    (value) => isDateWithinDays(value, 1, 180),
    'Expected joining date must be in the future and within the next 180 days',
  ),
  portfolioUrl: z
    .string()
    .trim()
    .max(200, 'Portfolio link must be 200 characters or fewer')
    .refine((value) => value === '' || isHttpUrl(value), 'Enter a valid link starting with http:// or https://'),
  coverNote: z
    .string()
    .trim()
    .max(1000, 'Cover note must be 1000 characters or fewer')
    .refine((value) => value === '' || value.length >= 20, 'Cover note must be at least 20 characters'),
  acceptedTerms: z.boolean().refine((value) => value, 'You must accept the terms to submit'),
});
