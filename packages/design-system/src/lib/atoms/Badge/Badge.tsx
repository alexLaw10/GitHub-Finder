import type { ReactNode } from 'react';
import styles from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'light';
export type BadgeShape = 'pill' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  ariaLabel?: string;
  children: ReactNode;
}

export function Badge({ variant = 'primary', shape = 'default', ariaLabel, children }: BadgeProps) {
  const className = [styles.badge, styles[`badge--${variant}`], shape === 'pill' ? styles['badge--pill'] : '']
    .filter(Boolean)
    .join(' ');

  return (
    <span className={className} aria-label={ariaLabel}>
      {children}
    </span>
  );
}
