import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';
import { buildUser } from '../../../test-utils/fixtures';

describe('UserCard', () => {
  it('renders the user name, username and stats', () => {
    render(
      <UserCard
        user={buildUser({ name: 'The Octocat', login: 'octocat', followers: 23135, following: 9, public_repos: 8 })}
      />
    );

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
    expect(screen.getByText('23135')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('falls back to the login when there is no display name', () => {
    render(<UserCard user={buildUser({ name: null, login: 'octocat' })} />);
    expect(screen.getByRole('heading', { name: 'octocat' })).toBeInTheDocument();
  });

  it('omits bio and email when absent', () => {
    render(<UserCard user={buildUser({ bio: null, email: null })} />);
    expect(screen.queryByText(/Email:/)).not.toBeInTheDocument();
  });

  it('shows bio and email when present', () => {
    render(<UserCard user={buildUser({ bio: 'How people build software.', email: 'octocat@github.com' })} />);

    expect(screen.getByText('How people build software.')).toBeInTheDocument();
    expect(screen.getByText('Email: octocat@github.com')).toBeInTheDocument();
  });

  it('links out to the GitHub profile', () => {
    render(<UserCard user={buildUser({ html_url: 'https://github.com/octocat' })} />);
    expect(screen.getByRole('link', { name: 'Ver no GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/octocat'
    );
  });
});
