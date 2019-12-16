import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import locations from 'routes';
import Navbar from "./components/Navbar";
import { ThemeProvider } from '@material-ui/core/styles';
import codelittTheme from './codelittMaterialTheme';

const EditFilePage = lazy(() => import('pages/EditFilePage'));
const ShowFilePage = lazy(() => import('pages/ShowFilePage'));

const routes = [
  { path: locations.getEditFilePath(), component: EditFilePage },
  { path: locations.getNewFilePath(), component: EditFilePage },
  { path: locations.getShowFilePath(), component: ShowFilePage },
];

const App: React.FC = () => (
  <Router>
    <ThemeProvider theme={codelittTheme}>
      <Navbar />
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
    </ThemeProvider>
  </Router>
);

export default App;
