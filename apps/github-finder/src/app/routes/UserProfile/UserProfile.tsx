import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useRepos } from '../../hooks/useRepos';
import { UserCard } from '../../components/UserCard/UserCard';
import { RepoList } from '../../components/RepoList/RepoList';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { getApiErrorMessage } from '@github-finder/api-client';
import { BackLink, PageContainer } from '@github-finder/design-system';

export function UserProfile() {
  const { username = '' } = useParams();
  const userQuery = useUser(username);
  const reposQuery = useRepos(username);

  if (userQuery.isLoading || reposQuery.isLoading) {
    return <Loading />;
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <ErrorMessage
        message={getApiErrorMessage(userQuery.error, `Usuário "${username}" não encontrado.`)}
      />
    );
  }

  return (
    <PageContainer>
      <BackLink to="/">Nova busca</BackLink>
      <UserCard user={userQuery.data} />
      {reposQuery.isError || !reposQuery.data ? (
        <ErrorMessage
          message={getApiErrorMessage(reposQuery.error, 'Não foi possível carregar os repositórios.')}
        />
      ) : (
        <RepoList repos={reposQuery.data} />
      )}
    </PageContainer>
  );
}
