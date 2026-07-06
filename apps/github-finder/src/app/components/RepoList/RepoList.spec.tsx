import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RepoList } from './RepoList';
import { buildRepo } from '../../../test-utils/fixtures';

const repos = [
  buildRepo({ id: 1, name: 'zebra', stargazers_count: 10, forks_count: 50, updated_at: '2024-01-01T00:00:00Z' }),
  buildRepo({ id: 2, name: 'apple', stargazers_count: 30, forks_count: 5, updated_at: '2024-03-01T00:00:00Z' }),
  buildRepo({ id: 3, name: 'mango', stargazers_count: 20, forks_count: 20, updated_at: '2024-02-01T00:00:00Z' }),
];

function renderRepoList() {
  render(
    <MemoryRouter>
      <RepoList repos={repos} />
    </MemoryRouter>
  );
}

function repoNamesInOrder() {
  return screen
    .getAllByRole('link')
    .map((link) => link.querySelector('.repo-list-item__name')?.textContent);
}

describe('RepoList', () => {
  it('shows the repo count in the header', () => {
    renderRepoList();
    expect(screen.getByText('Repositórios (3)')).toBeInTheDocument();
  });

  it('sorts by stars (descending) by default', () => {
    renderRepoList();
    expect(repoNamesInOrder()).toEqual(['apple', 'mango', 'zebra']);
  });

  it('re-sorts by name (A-Z) when the dropdown changes', () => {
    renderRepoList();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'name' } });
    expect(repoNamesInOrder()).toEqual(['apple', 'mango', 'zebra']);
  });

  it('re-sorts by forks when the dropdown changes', () => {
    renderRepoList();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'forks' } });
    expect(repoNamesInOrder()).toEqual(['zebra', 'mango', 'apple']);
  });

  it('re-sorts by most recently updated when the dropdown changes', () => {
    renderRepoList();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'updated' } });
    expect(repoNamesInOrder()).toEqual(['apple', 'mango', 'zebra']);
  });

  it('shows an empty state and hides the sort dropdown when there are no repos', () => {
    render(
      <MemoryRouter>
        <RepoList repos={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Repositórios (0)')).toBeInTheDocument();
    expect(screen.getByText('Nenhum repositório público')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
