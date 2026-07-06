import type { ReactNode } from 'react';

interface StatItemProps {
  value: number;
  label: ReactNode;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <span>
      <strong>{value}</strong> {label}
    </span>
  );
}
