import { useQuery } from '@tanstack/react-query';

export function useGithubResource<T>(key: string, id: string, fetcher: (id: string) => Promise<T>) {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => fetcher(id),
    enabled: Boolean(id),
    retry: false,
  });
}
