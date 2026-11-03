import { createGlobalTheme } from '@vanilla-extract/css';

/*
 * Shared design tokens. This is the ONLY place raw values are defined.
 * Every component reads from `vars`, so changing a value here updates every
 * component that uses it. `createGlobalTheme` writes each token to a CSS custom
 * property on :root, and `vars` is typed, so a misspelled token is a compile error.
 */
export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    danger: '#dc2626',
    dangerHover: '#b91c1c',
    onPrimary: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    surface: '#ffffff',
    background: '#f8fafc',
    border: '#e2e8f0',
    focusRing: 'rgba(129, 140, 248, 0.6)',
    successBg: '#dcfce7',
    successText: '#166534',
    warningBg: '#fef3c7',
    warningText: '#92400e',
    errorBg: '#fee2e2',
    errorText: '#991b1b',
    neutralBg: '#f1f5f9',
    neutralText: '#334155',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  radius: {
    md: '8px',
    lg: '12px',
    pill: '999px',
  },
  font: {
    family: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    sizeSm: '13px',
    sizeMd: '15px',
    sizeLg: '17px',
  },
  shadow: {
    card: '0 1px 2px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.08)',
  },
});
