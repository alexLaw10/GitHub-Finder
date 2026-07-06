import { getUserRepos } from '@github-finder/api-client';
import { useGithubResource } from './useGithubResource';

export function useRepos(username: string) {
  return useGithubResource('repos', username, getUserRepos);
}
