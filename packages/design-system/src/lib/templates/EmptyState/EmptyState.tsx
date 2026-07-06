import type { ReactNode } from 'react';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  description?: ReactNode;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles['empty-state']}>
      <p className={styles['empty-state__title']}>{title}</p>
      {description && <p className={styles['empty-state__description']}>{description}</p>}
    </div>
  );
}
