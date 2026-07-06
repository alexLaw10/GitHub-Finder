import type { ChangeEvent } from 'react';
import { Select } from '@/atoms/Select/Select';

export interface SortDropdownOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortDropdownOption[];
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  ariaLabel?: string;
}

export function SortDropdown({ options, value, onChange, prefix, ariaLabel }: SortDropdownProps) {
  return (
    <Select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {prefix ? `${prefix}: ${option.label}` : option.label}
        </option>
      ))}
    </Select>
  );
}
