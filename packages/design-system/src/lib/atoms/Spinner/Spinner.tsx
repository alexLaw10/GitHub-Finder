import styles from './Spinner.module.scss';

interface SpinnerProps {
  label?: string;
}

export function Spinner({ label = 'Carregando...' }: SpinnerProps) {
  return (
    <div className={styles.spinner} role="status">
      <span className={styles['spinner__label']}>{label}</span>
    </div>
  );
}
