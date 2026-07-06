import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { useUser } from '../../hooks/useUser';
import { useRepos } from '../../hooks/useRepos';
import { buildRepo, buildUser } from '../../../test-utils/fixtures';

vi.mock('../../hooks/useUser');
vi.mock('../../hooks/useRepos');

function renderUserProfile(username = 'octocat') {
  render(
    <MemoryRouter initialEntries={[`/${username}`]}>
      <Routes>
        <Route path="/:username" element={<UserProfile />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('UserProfile', () => {
  it('shows a loading indicator while the user or repos are loading', () => {
    vi.mocked(useUser).mockReturnValue({ isLoading: true, isError: false, data: undefined } as never);
    vi.mocked(useRepos).mockReturnValue({ isLoading: false, isError: false, data: undefined } as never);

    renderUserProfile();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message when the user is not found', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: { isAxiosError: true, response: { status: 404 } },
    } as never);
    vi.mocked(useRepos).mockReturnValue({ isLoading: false, isError: false, data: undefined } as never);

    renderUserProfile('does-not-exist');

    expect(screen.getByRole('alert')).toHaveTextContent('Usuário "does-not-exist" não encontrado.');
  });

  it('renders the user card and repo list on success', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoading: false,
      isError: false,
      data: buildUser({ login: 'octocat', name: 'The Octocat' }),
    } as never);
    vi.mocked(useRepos).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [buildRepo({ id: 1, name: 'Spoon-Knife' })],
    } as never);

    renderUserProfile();

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByText('Spoon-Knife')).toBeInTheDocument();
  });

  it('shows a repo-specific error while still rendering the user card', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoading: false,
      isError: false,
      data: buildUser({ login: 'octocat', name: 'The Octocat' }),
    } as never);
    vi.mocked(useRepos).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: { isAxiosError: true, response: { status: 404 } },
    } as never);

    renderUserProfile();

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar os repositórios.');
  });
});
