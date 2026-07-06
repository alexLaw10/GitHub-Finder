import type { HTMLAttributes } from 'react';
import styles from './PageContainer.module.scss';

type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, ...props }: PageContainerProps) {
  return <div className={[styles['page-container'], className].filter(Boolean).join(' ')} {...props} />;
}
