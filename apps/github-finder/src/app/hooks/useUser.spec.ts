import { renderHook, waitFor } from '@testing-library/react';
import { getUser } from '@github-finder/api-client';
import { useUser } from './useUser';
import { createQueryClientWrapper } from '../../test-utils/queryClientWrapper';

vi.mock('@github-finder/api-client', () => ({
  getUser: vi.fn(),
}));

describe('useUser', () => {
  it('fetches the user through getUser', async () => {
    vi.mocked(getUser).mockResolvedValue({ login: 'octocat' } as never);

    const { result } = renderHook(() => useUser('octocat'), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getUser).toHaveBeenCalledWith('octocat');
    expect(result.current.data).toEqual({ login: 'octocat' });
  });
});
