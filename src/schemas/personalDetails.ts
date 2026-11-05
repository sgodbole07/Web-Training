import { z } from 'zod';
import { isAgeWithin } from '../lib/dates';
import { isoDateField } from './common';

export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name')
    .max(80, 'Full name must be 80 characters or fewer')
    .regex(/^[A-Za-z][A-Za-z .'-]*$/, 'Use letters, spaces, apostrophes, periods or hyphens only'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(120, 'Email must be 120 characters or fewer')
    .email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,15}$/, 'Enter 10 to 15 digits, optionally starting with +'),
  dateOfBirth: isoDateField('Date of birth').refine(
    (value) => isAgeWithin(value, 18, 70),
    'You must be between 18 and 70 years old',
  ),
  currentCity: z
    .string()
    .trim()
    .min(2, 'Enter your current city')
    .max(60, 'City must be 60 characters or fewer'),
});
