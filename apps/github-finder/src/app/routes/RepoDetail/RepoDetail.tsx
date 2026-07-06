import { useParams } from 'react-router-dom';
import { useRepo } from '../../hooks/useRepo';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { RepoDetailCard } from '../../components/RepoDetailCard/RepoDetailCard';
import { getApiErrorMessage } from '@github-finder/api-client';
import { BackLink, PageContainer } from '@github-finder/design-system';
import styles from './RepoDetail.module.scss';

export function RepoDetail() {
  const { username = '', repo = '' } = useParams();
  const fullName = `${username}/${repo}`;

  const { data, error, isLoading, isError } = useRepo(fullName);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <ErrorMessage message={getApiErrorMessage(error, `Repositório "${fullName}" não encontrado.`)} />
    );
  }

  return (
    <PageContainer className={styles['repo-detail']}>
      <BackLink to={`/${username}`}>Voltar para {username}</BackLink>
      <RepoDetailCard repo={data} />
    </PageContainer>
  );
}
