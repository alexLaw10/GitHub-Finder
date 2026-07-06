import type { ReactNode } from 'react';
import styles from './Alert.module.scss';

export type AlertVariant = 'danger' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
}

export function Alert({ variant = 'danger', children }: AlertProps) {
  return (
    <div className={[styles.alert, styles[`alert--${variant}`]].join(' ')} role="alert">
      {children}
    </div>
  );
}
