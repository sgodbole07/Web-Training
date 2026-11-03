import { style, styleVariants } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/tokens.css';

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.family,
  fontSize: vars.font.sizeSm,
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  // A small dot drawn with a pseudo-element, in the current text color.
  selectors: {
    '&::before': {
      content: '""',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  },
});

const tone = styleVariants({
  success: {
    backgroundColor: vars.color.successBg,
    color: vars.color.successText,
  },
  warning: {
    backgroundColor: vars.color.warningBg,
    color: vars.color.warningText,
  },
  error: {
    backgroundColor: vars.color.errorBg,
    color: vars.color.errorText,
  },
  neutral: {
    backgroundColor: vars.color.neutralBg,
    color: vars.color.neutralText,
  },
});

export const badge = recipe({
  base,
  variants: { tone },
  defaultVariants: { tone: 'neutral' },
});

export type BadgeVariants = RecipeVariants<typeof badge>;
