import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import locations from 'routes';
import { ThemeProvider } from '@material-ui/core/styles';
import codelittTheme from './codelittMaterialTheme';
import {ProtectedRoute} from "./components/ProtectedRoute";

const EditFilePage = lazy(() => import('pages/EditFilePage'));
const ShowFilePage = lazy(() => import('pages/ShowFilePage'));
const LoginPage = lazy(() => import('pages/LoginPage'));

const routes = [
  { path: locations.getLoginPath(), component: LoginPage, isPublic: true },
  { path: locations.getShowFilePath(), component: ShowFilePage, isPublic: true },
  { path: locations.getEditFilePath(), component: EditFilePage, isPublic: false },
  { path: locations.getNewFilePath(), component: EditFilePage, isPublic: false },
];

const App: React.FC = () => (
  <Router>
    <ThemeProvider theme={codelittTheme}>
      <Suspense fallback={<div> Loading... </div>}>
        <Switch>
          {routes.map((route, idx) => (
            <ProtectedRoute
              key={idx}
              isPublic={route.isPublic}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
        </Switch>
      </Suspense>
    </ThemeProvider>
  </Router>
);

export default App;
