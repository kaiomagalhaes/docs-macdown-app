import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Properties from './pages/Properties';
import NotFound from './pages/NotFound';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Root = () => (
  <Router>
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/users" exact component={Users} />
        <Route path="/properties" exact component={Properties} />
        <Route component={NotFound} />
      </Switch>
    </>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
