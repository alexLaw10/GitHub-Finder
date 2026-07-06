import { renderHook, waitFor } from '@testing-library/react';
import { useGithubResource } from './useGithubResource';
import { createQueryClientWrapper } from '../../test-utils/queryClientWrapper';

describe('useGithubResource', () => {
  it('calls the fetcher with the given id and exposes the resolved data', async () => {
    const fetcher = vi.fn().mockResolvedValue({ login: 'octocat' });

    const { result } = renderHook(() => useGithubResource('user', 'octocat', fetcher), {
      wrapper: createQueryClientWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetcher).toHaveBeenCalledWith('octocat');
    expect(result.current.data).toEqual({ login: 'octocat' });
  });

  it('does not call the fetcher when the id is empty', () => {
    const fetcher = vi.fn().mockResolvedValue({});

    const { result } = renderHook(() => useGithubResource('user', '', fetcher), {
      wrapper: createQueryClientWrapper(),
    });

    expect(fetcher).not.toHaveBeenCalled();
    expect(result.current.fetchStatus).toBe('idle');
  });

  it('exposes the error without retrying when the fetcher rejects', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('network down'));

    const { result } = renderHook(() => useGithubResource('user', 'octocat', fetcher), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
