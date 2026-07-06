import { Route, Routes } from 'react-router-dom';
import { AppHeader } from '@github-finder/design-system';
import { Search } from './routes/Search/Search';
import { UserProfile } from './routes/UserProfile/UserProfile';
import { RepoDetail } from './routes/RepoDetail/RepoDetail';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <AppHeader title="GitHub Finder" />
      <main className={styles['app__main']}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/:username" element={<UserProfile />} />
          <Route path="/:username/:repo" element={<RepoDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
