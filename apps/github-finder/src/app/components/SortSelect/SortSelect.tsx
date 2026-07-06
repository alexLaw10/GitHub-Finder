import { SortDropdown } from '@github-finder/design-system';

export type SortOption = 'stars' | 'name' | 'updated' | 'forks';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Atualização recente' },
  { value: 'name', label: 'Nome (A-Z)' },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <SortDropdown
      options={OPTIONS}
      value={value}
      onChange={(v) => onChange(v as SortOption)}
      prefix="Ordenar por"
      ariaLabel="Ordenar repositórios"
    />
  );
}
