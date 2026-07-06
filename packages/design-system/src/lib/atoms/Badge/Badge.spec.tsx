import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>C</Badge>);
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('defaults to the primary variant with no pill shape', () => {
    render(<Badge>C</Badge>);
    const badge = screen.getByText('C');
    expect(badge).toHaveClass('badge', 'badge--primary');
    expect(badge).not.toHaveClass('badge--pill');
  });

  it('applies the light variant', () => {
    render(<Badge variant="light">C</Badge>);
    expect(screen.getByText('C')).toHaveClass('badge--light');
  });

  it('applies the pill shape', () => {
    render(
      <Badge shape="pill">
        <span>★ 10</span>
      </Badge>
    );
    expect(screen.getByText('★ 10').parentElement).toHaveClass('badge--pill');
  });

  it('exposes an accessible name when ariaLabel is provided', () => {
    render(<Badge ariaLabel="10 estrelas">★ 10</Badge>);
    expect(screen.getByLabelText('10 estrelas')).toBeInTheDocument();
  });
});
