import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('body', {
  margin: 0,
  fontFamily: vars.font.family,
  backgroundColor: vars.color.background,
  color: vars.color.text,
});
