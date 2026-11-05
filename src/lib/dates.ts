const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const parseIsoDate = (value: string): Date | null => {
  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isRealDate ? date : null;
};

export const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const addYears = (date: Date, years: number): Date =>
  new Date(date.getFullYear() + years, date.getMonth(), date.getDate());

export const isDateWithinDays = (value: string, minDays: number, maxDays: number): boolean => {
  const date = parseIsoDate(value);
  if (!date) {
    return false;
  }
  const today = startOfToday();
  return (
    date.getTime() >= addDays(today, minDays).getTime() &&
    date.getTime() <= addDays(today, maxDays).getTime()
  );
};

export const isDateOnOrBefore = (value: string, limit: Date): boolean => {
  const date = parseIsoDate(value);
  return date !== null && date.getTime() <= limit.getTime();
};

export const isAgeWithin = (value: string, minYears: number, maxYears: number): boolean => {
  const date = parseIsoDate(value);
  if (!date) {
    return false;
  }
  const today = startOfToday();
  return (
    date.getTime() <= addYears(today, -minYears).getTime() &&
    date.getTime() >= addYears(today, -maxYears).getTime()
  );
};
