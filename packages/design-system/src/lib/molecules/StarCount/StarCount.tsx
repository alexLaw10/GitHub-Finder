import { Badge } from '@/atoms/Badge/Badge';

interface StarCountProps {
  count: number;
}

export function StarCount({ count }: StarCountProps) {
  return (
    <Badge variant="primary" shape="pill" ariaLabel={`${count} estrelas`}>
      <span aria-hidden="true">★ {count}</span>
    </Badge>
  );
}
