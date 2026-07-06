import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './BackLink.module.scss';

interface BackLinkProps {
  to: string;
  children: ReactNode;
}

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className={styles['back-link']}>
      <span aria-hidden="true">&larr;</span> {children}
    </Link>
  );
}
