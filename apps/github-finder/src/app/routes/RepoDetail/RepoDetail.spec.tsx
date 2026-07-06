import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RepoDetail } from './RepoDetail';
import { useRepo } from '../../hooks/useRepo';
import { buildRepo } from '../../../test-utils/fixtures';

vi.mock('../../hooks/useRepo');

function renderRepoDetail(username = 'octocat', repo = 'Spoon-Knife') {
  render(
    <MemoryRouter initialEntries={[`/${username}/${repo}`]}>
      <Routes>
        <Route path="/:username/:repo" element={<RepoDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('RepoDetail', () => {
  it('shows a loading indicator while fetching', () => {
    vi.mocked(useRepo).mockReturnValue({ isLoading: true, isError: false, data: undefined } as never);

    renderRepoDetail();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message when the repo is not found', () => {
    vi.mocked(useRepo).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: { isAxiosError: true, response: { status: 404 } },
    } as never);

    renderRepoDetail('octocat', 'does-not-exist');

    expect(screen.getByRole('alert')).toHaveTextContent('Repositório "octocat/does-not-exist" não encontrado.');
  });

  it('renders the repo detail card on success with a back link to the user profile', () => {
    vi.mocked(useRepo).mockReturnValue({
      isLoading: false,
      isError: false,
      data: buildRepo({ name: 'Spoon-Knife', full_name: 'octocat/Spoon-Knife' }),
    } as never);

    renderRepoDetail();

    expect(screen.getByRole('heading', { name: 'Spoon-Knife' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voltar para octocat/ })).toHaveAttribute('href', '/octocat');
  });
});
