import type { FieldPath, FieldValues } from 'react-hook-form';

const leafPaths = (value: unknown, path: string): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leafPaths(item, `${path}.${index}`));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => leafPaths(child, `${path}.${key}`));
  }
  return [path];
};

export const collectFieldPaths = <TValues extends FieldValues>(
  values: TValues,
  sections: readonly string[],
): FieldPath<TValues>[] =>
  sections.flatMap((section) => leafPaths(values[section], section)) as FieldPath<TValues>[];
