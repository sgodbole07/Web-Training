import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  padding: vars.space.lg,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.card,
  // Responsive: extra padding from 768px up, using the same spacing tokens.
  '@media': {
    'screen and (min-width: 768px)': {
      padding: vars.space.xl,
    },
  },
});

export const cardTitle = style({
  margin: 0,
  fontSize: vars.font.sizeLg,
  fontWeight: 600,
});

export const cardBody = style({
  margin: 0,
  fontSize: vars.font.sizeMd,
  color: vars.color.textMuted,
  lineHeight: 1.5,
});
