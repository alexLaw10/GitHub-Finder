import { getUser } from '@github-finder/api-client';
import { useGithubResource } from './useGithubResource';

export function useUser(username: string) {
  return useGithubResource('user', username, getUser);
}
