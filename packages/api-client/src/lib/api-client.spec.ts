import type { GithubRepo, GithubUser } from '@github-finder/types';
import { githubApi, getUser, getUserRepos, getRepo, getApiErrorMessage } from './api-client';

describe('githubApi', () => {
  it('points to the public GitHub API', () => {
    expect(githubApi.defaults.baseURL).toBe('https://api.github.com');
  });
});

describe('getUser', () => {
  it('requests /users/:username and returns the response data', async () => {
    const user = { login: 'octocat' } as GithubUser;
    const getSpy = vi.spyOn(githubApi, 'get').mockResolvedValue({ data: user });

    const result = await getUser('octocat');

    expect(getSpy).toHaveBeenCalledWith('/users/octocat');
    expect(result).toBe(user);
  });
});

describe('getUserRepos', () => {
  it('requests /users/:username/repos with per_page=100', async () => {
    const repos = [{ id: 1 }] as GithubRepo[];
    const getSpy = vi.spyOn(githubApi, 'get').mockResolvedValue({ data: repos });

    const result = await getUserRepos('octocat');

    expect(getSpy).toHaveBeenCalledWith('/users/octocat/repos', { params: { per_page: 100 } });
    expect(result).toBe(repos);
  });
});

describe('getRepo', () => {
  it('requests /repos/:fullName and returns the response data', async () => {
    const repo = { id: 1, full_name: 'octocat/Spoon-Knife' } as GithubRepo;
    const getSpy = vi.spyOn(githubApi, 'get').mockResolvedValue({ data: repo });

    const result = await getRepo('octocat/Spoon-Knife');

    expect(getSpy).toHaveBeenCalledWith('/repos/octocat/Spoon-Knife');
    expect(result).toBe(repo);
  });
});

describe('getApiErrorMessage', () => {
  function axiosError(status: number) {
    return { isAxiosError: true, response: { status } };
  }

  it('returns the notFoundMessage for a 404', () => {
    expect(getApiErrorMessage(axiosError(404), 'Usuário não encontrado.')).toBe('Usuário não encontrado.');
  });

  it('returns a rate-limit message for a 403', () => {
    expect(getApiErrorMessage(axiosError(403), 'Usuário não encontrado.')).toMatch(/Limite de requisições/);
  });

  it('returns a generic message for other axios errors', () => {
    expect(getApiErrorMessage(axiosError(500), 'Usuário não encontrado.')).toBe(
      'Ocorreu um erro ao consultar a API do GitHub.'
    );
  });

  it('returns a generic message for non-axios errors', () => {
    expect(getApiErrorMessage(new Error('network down'), 'Usuário não encontrado.')).toBe(
      'Ocorreu um erro ao consultar a API do GitHub.'
    );
  });

  it('returns a generic message when there is no error at all', () => {
    expect(getApiErrorMessage(undefined, 'Usuário não encontrado.')).toBe(
      'Ocorreu um erro ao consultar a API do GitHub.'
    );
  });
});
