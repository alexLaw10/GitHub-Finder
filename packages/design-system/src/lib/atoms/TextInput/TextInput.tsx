import type { InputHTMLAttributes } from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...props }: TextInputProps) {
  return <input type="text" className={[styles.input, className].filter(Boolean).join(' ')} {...props} />;
}
