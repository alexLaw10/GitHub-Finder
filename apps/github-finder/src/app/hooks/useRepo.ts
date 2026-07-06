import { getRepo } from '@github-finder/api-client';
import { useGithubResource } from './useGithubResource';

export function useRepo(fullName: string) {
  return useGithubResource('repo', fullName, getRepo);
}
