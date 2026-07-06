import type { GithubRepo } from '@github-finder/types';
import { Card, LanguageBadge, StarCount, ButtonLink } from '@github-finder/design-system';
import styles from './RepoDetailCard.module.scss';

interface RepoDetailCardProps {
  repo: GithubRepo;
}

export function RepoDetailCard({ repo }: RepoDetailCardProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{repo.name}</Card.Title>
        {repo.description && <Card.Text>{repo.description}</Card.Text>}
        <div className={styles['repo-detail-card__badges']}>
          <StarCount count={repo.stargazers_count} />
          {repo.language && <LanguageBadge language={repo.language} />}
        </div>
        <ButtonLink variant="outline-primary" href={repo.html_url} target="_blank" rel="noreferrer noopener">
          Ver no GitHub
        </ButtonLink>
      </Card.Body>
    </Card>
  );
}
