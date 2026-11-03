// Joins class strings, skipping falsy values. Used only to merge the utility
// classes a component owns with ones passed in by its parent.
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
