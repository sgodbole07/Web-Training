import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { badge, type BadgeVariants } from './Badge.css';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariants;

export function Badge({ tone, className, ...rest }: BadgeProps) {
  return <span className={cx(badge({ tone }), className)} {...rest} />;
}
