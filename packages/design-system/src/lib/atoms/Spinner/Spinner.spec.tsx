import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('exposes a status role with a default accessible label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveTextContent('Carregando...');
  });

  it('accepts a custom label', () => {
    render(<Spinner label="Buscando usuário..." />);
    expect(screen.getByRole('status')).toHaveTextContent('Buscando usuário...');
  });

  it('keeps the label visually hidden but present for assistive tech', () => {
    render(<Spinner />);
    expect(screen.getByText('Carregando...')).toHaveClass('spinner__label');
  });
});
