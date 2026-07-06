import type { GithubRepo, GithubUser } from '@github-finder/types';

export function buildRepo(overrides: Partial<GithubRepo> = {}): GithubRepo {
  return {
    id: 1,
    name: 'Spoon-Knife',
    full_name: 'octocat/Spoon-Knife',
    description: 'This repo is for demonstration purposes only.',
    stargazers_count: 100,
    forks_count: 10,
    language: 'HTML',
    html_url: 'https://github.com/octocat/Spoon-Knife',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
  };
}

export function buildUser(overrides: Partial<GithubUser> = {}): GithubUser {
  return {
    login: 'octocat',
    name: 'The Octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/1',
    bio: null,
    email: null,
    followers: 100,
    following: 10,
    public_repos: 8,
    html_url: 'https://github.com/octocat',
    ...overrides,
  };
}
