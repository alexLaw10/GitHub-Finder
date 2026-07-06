import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenteredLayout, SearchBar } from '@github-finder/design-system';
import styles from './Search.module.scss';

export function Search() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleSearch() {
    const trimmed = username.trim();
    if (trimmed) {
      navigate(`/${trimmed}`);
    }
  }

  return (
    <CenteredLayout>
      <h1 className={styles['search__title']}>Encontre um usuário do GitHub</h1>
      <SearchBar
        value={username}
        onChange={setUsername}
        onSubmit={handleSearch}
        placeholder="Buscar usuário do GitHub..."
        ariaLabel="Nome de usuário do GitHub"
      />
    </CenteredLayout>
  );
}
