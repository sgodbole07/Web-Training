import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { card, cardBody, cardTitle } from './Card.css';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <article className={cx(card, className)} {...rest}>
      {children}
    </article>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className={cardTitle}>{children}</h3>;
}

export function CardBody({ children }: { children: ReactNode }) {
  return <p className={cardBody}>{children}</p>;
}
