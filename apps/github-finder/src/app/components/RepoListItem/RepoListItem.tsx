import { Link } from 'react-router-dom';
import type { GithubRepo } from '@github-finder/types';
import { LanguageBadge, StarCount } from '@github-finder/design-system';
import styles from './RepoListItem.module.scss';

interface RepoListItemProps {
  repo: GithubRepo;
}

export function RepoListItem({ repo }: RepoListItemProps) {
  const [owner, name] = repo.full_name.split('/');

  return (
    <li className={styles['repo-list-item']}>
      <Link to={`/${owner}/${name}`} className={styles['repo-list-item__link']}>
        <div>
          <div className={styles['repo-list-item__name']}>{repo.name}</div>
          {repo.description && (
            <div className={styles['repo-list-item__description']}>{repo.description}</div>
          )}
          {repo.language && (
            <div className={styles['repo-list-item__language']}>
              <LanguageBadge language={repo.language} />
            </div>
          )}
        </div>
        <StarCount count={repo.stargazers_count} />
      </Link>
    </li>
  );
}
