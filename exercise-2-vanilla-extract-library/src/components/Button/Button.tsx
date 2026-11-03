import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { button, type ButtonVariants } from './Button.css';

// Variant props come straight from the recipe, so `variant` and `size` are type-checked.
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cx(button({ variant, size }), className)} {...rest} />;
}
