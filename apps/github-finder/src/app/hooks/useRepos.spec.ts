import { renderHook, waitFor } from '@testing-library/react';
import { getUserRepos } from '@github-finder/api-client';
import { useRepos } from './useRepos';
import { createQueryClientWrapper } from '../../test-utils/queryClientWrapper';

vi.mock('@github-finder/api-client', () => ({
  getUserRepos: vi.fn(),
}));

describe('useRepos', () => {
  it('fetches the repos through getUserRepos', async () => {
    vi.mocked(getUserRepos).mockResolvedValue([{ id: 1 }] as never);

    const { result } = renderHook(() => useRepos('octocat'), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getUserRepos).toHaveBeenCalledWith('octocat');
    expect(result.current.data).toEqual([{ id: 1 }]);
  });
});
