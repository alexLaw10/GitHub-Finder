import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the given message inside an alert', () => {
    render(<ErrorMessage message='Usuário "octocat" não encontrado.' />);
    expect(screen.getByRole('alert')).toHaveTextContent('Usuário "octocat" não encontrado.');
  });
});
