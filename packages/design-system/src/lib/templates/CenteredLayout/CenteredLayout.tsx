import type { HTMLAttributes } from 'react';
import styles from './CenteredLayout.module.scss';

type CenteredLayoutProps = HTMLAttributes<HTMLDivElement>;

export function CenteredLayout({ className, ...props }: CenteredLayoutProps) {
  return <div className={[styles['centered-layout'], className].filter(Boolean).join(' ')} {...props} />;
}
