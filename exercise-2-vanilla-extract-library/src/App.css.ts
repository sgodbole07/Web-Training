import { style } from '@vanilla-extract/css';
import { vars } from './styles/tokens.css';

export const page = style({
  maxWidth: '1100px',
  margin: '0 auto',
  padding: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xxl,
  '@media': {
    'screen and (min-width: 768px)': {
      padding: vars.space.xxl,
    },
  },
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
});

export const sectionHeading = style({
  margin: 0,
  fontSize: vars.font.sizeLg,
  fontWeight: 700,
});

export const row = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space.md,
});

// One column on phones, two from 768px up, to show responsive layout with tokens.
export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.lg,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});
