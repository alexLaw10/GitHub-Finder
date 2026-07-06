import { renderHook, waitFor } from '@testing-library/react';
import { getRepo } from '@github-finder/api-client';
import { useRepo } from './useRepo';
import { createQueryClientWrapper } from '../../test-utils/queryClientWrapper';

vi.mock('@github-finder/api-client', () => ({
  getRepo: vi.fn(),
}));

describe('useRepo', () => {
  it('fetches the repo through getRepo', async () => {
    vi.mocked(getRepo).mockResolvedValue({ id: 1, full_name: 'octocat/Spoon-Knife' } as never);

    const { result } = renderHook(() => useRepo('octocat/Spoon-Knife'), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getRepo).toHaveBeenCalledWith('octocat/Spoon-Knife');
    expect(result.current.data).toEqual({ id: 1, full_name: 'octocat/Spoon-Knife' });
  });
});
