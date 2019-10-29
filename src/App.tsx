import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import styles from './App.module.scss';

const Users = lazy(() => import('pages/Users'));
const ListProperties = lazy(() => import('pages/Properties/ListProperties'));
const ShowProperty = lazy(() => import('pages/Properties/ShowProperty'));
const NewProperty = lazy(() => import('pages/Properties/NewProperty'));
const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/NotFound'));

const App: React.FC = () => (
  <Router>
    <Navbar />
    <div className={styles.app}>
      <header className={styles['app-header']}>
        <Suspense fallback={<div> Loading... </div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/properties" exact component={ListProperties} />
            <Route path="/properties/new" exact component={NewProperty} />
            <Route path="/properties/:id" exact component={ShowProperty} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </header>
    </div>
  </Router>
);

export default App;
