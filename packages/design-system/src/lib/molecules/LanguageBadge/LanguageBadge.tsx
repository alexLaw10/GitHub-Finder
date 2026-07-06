import { Badge } from '@/atoms/Badge/Badge';

interface LanguageBadgeProps {
  language: string;
}

export function LanguageBadge({ language }: LanguageBadgeProps) {
  return (
    <Badge variant="light">
      {language}
    </Badge>
  );
}
