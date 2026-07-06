import { render, screen, fireEvent } from '@testing-library/react';
import { Button, ButtonLink } from './Button';

describe('Button', () => {
  it('renders children and responds to clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Buscar</Button>);

    const button = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('defaults to the primary variant', () => {
    render(<Button>Buscar</Button>);
    expect(screen.getByRole('button')).toHaveClass('button', 'button--primary');
  });

  it('applies the outline-primary variant', () => {
    render(<Button variant="outline-primary">Buscar</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--outline-primary');
  });

  it('applies the small size modifier', () => {
    render(<Button size="sm">Buscar</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--sm');
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Buscar
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('merges a custom className', () => {
    render(<Button className="custom">Buscar</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });
});

describe('ButtonLink', () => {
  it('renders as an anchor with the given href', () => {
    render(<ButtonLink href="https://github.com/octocat">Ver no GitHub</ButtonLink>);

    const link = screen.getByRole('link', { name: 'Ver no GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/octocat');
    expect(link).toHaveClass('button', 'button--primary');
  });
});
