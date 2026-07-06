import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Search } from './Search';

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderSearch() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <LocationDisplay />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="*" element={null} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Search', () => {
  it('renders the title and search field', () => {
    renderSearch();
    expect(screen.getByRole('heading', { name: 'Encontre um usuário do GitHub' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nome de usuário do GitHub')).toBeInTheDocument();
  });

  it('navigates to /:username when the form is submitted', () => {
    renderSearch();

    fireEvent.change(screen.getByLabelText('Nome de usuário do GitHub'), { target: { value: 'octocat' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/octocat');
  });

  it('trims whitespace from the username before navigating', () => {
    renderSearch();

    fireEvent.change(screen.getByLabelText('Nome de usuário do GitHub'), { target: { value: '  octocat  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/octocat');
  });

  it('does not navigate when the username is empty', () => {
    renderSearch();

    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/');
  });
});
