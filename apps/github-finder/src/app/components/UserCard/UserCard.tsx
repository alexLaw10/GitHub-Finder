import type { GithubUser } from '@github-finder/types';
import { Avatar, ButtonLink, Card, StatItem } from '@github-finder/design-system';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: GithubUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className={styles['user-card']}>
      <div className={styles['user-card__layout']}>
        <div className={styles['user-card__avatar']}>
          <Avatar src={user.avatar_url} alt={`Avatar de ${user.login}`} />
        </div>
        <div className={styles['user-card__body']}>
          <Card.Body>
            <Card.Title>{user.name ?? user.login}</Card.Title>
            <p className={styles['user-card__username']}>@{user.login}</p>
            {user.bio && <Card.Text>{user.bio}</Card.Text>}
            {user.email && <Card.Text>Email: {user.email}</Card.Text>}
            <div className={styles['user-card__stats']}>
              <StatItem value={user.followers} label="seguidores" />
              <StatItem value={user.following} label="seguindo" />
              <StatItem value={user.public_repos} label="repositórios" />
            </div>
            <ButtonLink
              variant="outline-primary"
              size="sm"
              href={user.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className={styles['user-card__link']}
            >
              Ver no GitHub
            </ButtonLink>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}
