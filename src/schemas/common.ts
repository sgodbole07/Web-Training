import { z } from 'zod';
import { parseIsoDate } from '../lib/dates';

export const isValidIsoDate = (value: string): boolean => parseIsoDate(value) !== null;

export const choiceField = <const T extends string>(options: readonly T[], message: string) =>
  z.string().refine((value) => (options as readonly string[]).includes(value), message);

export const isoDateField = (label: string) =>
  z.string().min(1, `${label} is required`).refine(isValidIsoDate, `${label} must be a valid date`);

export const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};
