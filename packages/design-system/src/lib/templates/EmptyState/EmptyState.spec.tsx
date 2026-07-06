import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="Nenhum repositório encontrado" />);
    expect(screen.getByText('Nenhum repositório encontrado')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(<EmptyState title="Sem bio" description="Este usuário não escreveu uma bio." />);
    expect(screen.getByText('Este usuário não escreveu uma bio.')).toBeInTheDocument();
  });

  it('omits the description when not provided', () => {
    const { container } = render(<EmptyState title="Sem bio" />);
    expect(container.querySelector('.empty-state__description')).not.toBeInTheDocument();
  });
});
