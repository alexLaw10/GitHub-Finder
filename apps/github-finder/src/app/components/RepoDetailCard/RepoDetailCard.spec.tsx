import { render, screen } from '@testing-library/react';
import { RepoDetailCard } from './RepoDetailCard';
import { buildRepo } from '../../../test-utils/fixtures';

describe('RepoDetailCard', () => {
  it('renders the repo name, description, stars, language and GitHub link', () => {
    render(
      <RepoDetailCard
        repo={buildRepo({
          name: 'Spoon-Knife',
          description: 'This repo is for demonstration purposes only.',
          language: 'HTML',
          stargazers_count: 13871,
          html_url: 'https://github.com/octocat/Spoon-Knife',
        })}
      />
    );

    expect(screen.getByRole('heading', { name: 'Spoon-Knife' })).toBeInTheDocument();
    expect(screen.getByText('This repo is for demonstration purposes only.')).toBeInTheDocument();
    expect(screen.getByLabelText('13871 estrelas')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver no GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/octocat/Spoon-Knife'
    );
  });

  it('omits description and language badge when absent', () => {
    render(<RepoDetailCard repo={buildRepo({ description: null, language: null })} />);
    expect(screen.queryByText(/demonstration/)).not.toBeInTheDocument();
  });
});
