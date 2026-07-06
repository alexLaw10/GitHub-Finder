import { useMemo, useState } from 'react';
import type { GithubRepo } from '@github-finder/types';
import { EmptyState } from '@github-finder/design-system';
import { RepoListItem } from '../RepoListItem/RepoListItem';
import { SortSelect, type SortOption } from '../SortSelect/SortSelect';
import styles from './RepoList.module.scss';

interface RepoListProps {
  repos: GithubRepo[];
}

const SORTERS: Record<SortOption, (a: GithubRepo, b: GithubRepo) => number> = {
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
  forks: (a, b) => b.forks_count - a.forks_count,
  updated: (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  name: (a, b) => a.name.localeCompare(b.name),
};

export function RepoList({ repos }: RepoListProps) {
  const [sort, setSort] = useState<SortOption>('stars');

  const sortedRepos = useMemo(
    () => [...repos].sort(SORTERS[sort]),
    [repos, sort]
  );

  return (
    <div className={styles['repo-list']}>
      <div className={styles['repo-list__header']}>
        <h4 className={styles['repo-list__title']}>Repositórios ({repos.length})</h4>
        {repos.length > 0 && <SortSelect value={sort} onChange={setSort} />}
      </div>
      {repos.length === 0 ? (
        <EmptyState
          title="Nenhum repositório público"
          description="Este usuário ainda não tem repositórios públicos no GitHub."
        />
      ) : (
        <ul className={styles['repo-list__items']}>
          {sortedRepos.map((repo) => (
            <RepoListItem key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}
