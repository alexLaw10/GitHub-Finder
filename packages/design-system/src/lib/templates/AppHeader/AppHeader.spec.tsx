import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  it('renders the title and links to / by default', () => {
    render(
      <MemoryRouter>
        <AppHeader title="GitHub Finder" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'GitHub Finder' })).toHaveAttribute('href', '/');
  });

  it('links to a custom destination when to is provided', () => {
    render(
      <MemoryRouter>
        <AppHeader title="GitHub Finder" to="/octocat" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/octocat');
  });
});
