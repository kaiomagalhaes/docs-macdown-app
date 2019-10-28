import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import styles from './App.module.scss';

const Users = lazy(() => import('./pages/Users'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyPage = lazy(() => import('./pages/PropertyPage'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => (
  <Router>
    <Navbar />
    <div className={styles.app}>
      <header className={styles['app-header']}>
        <Suspense fallback={<div> Loading... </div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/properties" exact component={Properties} />
            <Route path="/properties/:id" exact component={PropertyPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </header>
    </div>
  </Router>
);

export default App;
