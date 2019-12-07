import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import locations from 'routes';

const Home = lazy(() => import('pages/Home'));
const MDView = lazy(() => import('pages/MDView'));

const routes = [
  { path: locations.root(), component: Home },
  { path: locations.mdview(), component: MDView },
];

const App: React.FC = () => (
  <Router>
    <div className={styles.app}>
      <div className={styles['app-content']}>
        <Suspense fallback={<div> Loading... </div>}>
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                exact
                component={route.component}
              />
            ))}
          </Switch>
        </Suspense>
      </div>
    </div>
  </Router>
);

export default App;
