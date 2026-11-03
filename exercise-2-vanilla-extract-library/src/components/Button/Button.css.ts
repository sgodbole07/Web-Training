import { style, styleVariants } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/tokens.css';

// Base styles shared by every button. Interaction states are selectors on the same
// class, so they apply to every variant and size.
const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.xs,
  border: '1px solid transparent',
  borderRadius: vars.radius.md,
  fontFamily: vars.font.family,
  fontWeight: 600,
  lineHeight: 1.2,
  cursor: 'pointer',
  transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease',
  selectors: {
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${vars.color.focusRing}`,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

// Variant styles. Each one composes with `base` through the recipe below.
const variant = styleVariants({
  primary: {
    backgroundColor: vars.color.primary,
    color: vars.color.onPrimary,
    selectors: {
      '&:hover:not(:disabled)': { backgroundColor: vars.color.primaryHover },
    },
  },
  secondary: {
    backgroundColor: vars.color.surface,
    borderColor: vars.color.border,
    color: vars.color.text,
    selectors: {
      '&:hover:not(:disabled)': {
        borderColor: vars.color.primary,
        color: vars.color.primary,
      },
    },
  },
  danger: {
    backgroundColor: vars.color.danger,
    color: vars.color.onPrimary,
    selectors: {
      '&:hover:not(:disabled)': { backgroundColor: vars.color.dangerHover },
    },
  },
});

// Size styles compose base spacing/typography tokens. Sizes are separate from variants,
// so every variant x size combination works without extra rules.
const size = styleVariants({
  sm: {
    padding: `${vars.space.xs} ${vars.space.md}`,
    fontSize: vars.font.sizeSm,
  },
  md: {
    padding: `${vars.space.sm} ${vars.space.lg}`,
    fontSize: vars.font.sizeMd,
  },
  lg: {
    padding: `${vars.space.md} ${vars.space.xl}`,
    fontSize: vars.font.sizeLg,
    '@media': {
      // Full-width on phones keeps the large button comfortable to tap.
      'screen and (max-width: 639px)': { width: '100%' },
    },
  },
});

// The recipe is the typed variant API. Variant names and their allowed values come from
// the object above, so `<Button variant="warning">` is a TypeScript error.
export const button = recipe({
  base,
  variants: {
    variant,
    size,
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
