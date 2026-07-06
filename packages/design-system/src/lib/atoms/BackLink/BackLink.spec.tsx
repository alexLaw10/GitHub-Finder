import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('links to the given route', () => {
    render(
      <MemoryRouter>
        <BackLink to="/octocat">Voltar para octocat</BackLink>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Voltar para octocat' })).toHaveAttribute('href', '/octocat');
  });

  it('hides the decorative arrow from assistive tech', () => {
    render(
      <MemoryRouter>
        <BackLink to="/">Nova busca</BackLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAccessibleName('Nova busca');
    expect(link.querySelector('[aria-hidden="true"]')).toHaveTextContent('←');
  });
});
