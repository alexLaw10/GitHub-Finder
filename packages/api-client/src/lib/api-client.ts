import axios from 'axios';
import type { GithubRepo, GithubUser } from '@github-finder/types';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
});

export async function getUser(username: string): Promise<GithubUser> {
  const { data } = await githubApi.get<GithubUser>(`/users/${username}`);
  return data;
}

export async function getUserRepos(username: string): Promise<GithubRepo[]> {
  const { data } = await githubApi.get<GithubRepo[]>(`/users/${username}/repos`, {
    params: { per_page: 100 },
  });
  return data;
}

export async function getRepo(fullName: string): Promise<GithubRepo> {
  const { data } = await githubApi.get<GithubRepo>(`/repos/${fullName}`);
  return data;
}

export function getApiErrorMessage(error: unknown, notFoundMessage: string): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return notFoundMessage;
    }
    if (error.response?.status === 403) {
      return 'Limite de requisições à API do GitHub excedido. Tente novamente em alguns minutos.';
    }
  }
  return 'Ocorreu um erro ao consultar a API do GitHub.';
}
