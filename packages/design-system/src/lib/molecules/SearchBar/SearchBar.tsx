import type { FormEvent } from 'react';
import { TextInput } from '@/atoms/TextInput/TextInput';
import { Button } from '@/atoms/Button/Button';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  ariaLabel?: string;
  submitLabel?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  ariaLabel,
  submitLabel = 'Buscar',
}: SearchBarProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={styles['search-bar']}>
      <div className={styles['search-bar__group']}>
        <TextInput
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
        />
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
