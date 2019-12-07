import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import locations from 'routes';

const EditFilePage = lazy(() => import('pages/EditFilePage'));
const ShowFilePage = lazy(() => import('pages/ShowFilePage'));

const routes = [
  { path: locations.getEditFilePath(), component: EditFilePage },
  { path: locations.getNewFilePath(), component: EditFilePage },
  { path: locations.getShowFilePath(), component: ShowFilePage },
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
