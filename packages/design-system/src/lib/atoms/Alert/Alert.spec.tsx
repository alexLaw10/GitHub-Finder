import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders its message inside an alert role', () => {
    render(<Alert>Usuário não encontrado.</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Usuário não encontrado.');
  });

  it('defaults to the danger variant', () => {
    render(<Alert>Erro</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert--danger');
  });

  it('applies the info variant', () => {
    render(<Alert variant="info">Aviso</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert--info');
  });
});
