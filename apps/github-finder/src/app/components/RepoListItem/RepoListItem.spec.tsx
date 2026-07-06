import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RepoListItem } from './RepoListItem';
import { buildRepo } from '../../../test-utils/fixtures';

function renderItem(overrides: Parameters<typeof buildRepo>[0] = {}) {
  return render(
    <MemoryRouter>
      <ul>
        <RepoListItem repo={buildRepo(overrides)} />
      </ul>
    </MemoryRouter>
  );
}

describe('RepoListItem', () => {
  it('links to /:owner/:repo derived from full_name', () => {
    renderItem({ full_name: 'octocat/Spoon-Knife' });
    expect(screen.getByRole('link')).toHaveAttribute('href', '/octocat/Spoon-Knife');
  });

  it('shows the repo name, description, language and star count', () => {
    renderItem({
      name: 'Spoon-Knife',
      description: 'This repo is for demonstration purposes only.',
      language: 'HTML',
      stargazers_count: 13871,
    });

    expect(screen.getByText('Spoon-Knife')).toBeInTheDocument();
    expect(screen.getByText('This repo is for demonstration purposes only.')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByLabelText('13871 estrelas')).toBeInTheDocument();
  });

  it('omits description and language badge when absent', () => {
    renderItem({ description: null, language: null });
    expect(screen.queryByText('HTML')).not.toBeInTheDocument();
  });
});
