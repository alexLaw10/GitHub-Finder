import { Link } from 'react-router-dom';
import styles from './AppHeader.module.scss';

interface AppHeaderProps {
  title: string;
  to?: string;
}

export function AppHeader({ title, to = '/' }: AppHeaderProps) {
  return (
    <header className={styles['app-header']}>
      <Link to={to} className={styles['app-header__brand']}>
        <span className={styles['app-header__mark']} aria-hidden="true">
          {'</>'}
        </span>
        {title}
      </Link>
    </header>
  );
}
