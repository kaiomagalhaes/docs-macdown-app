import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Users from 'pages/Users';
import Properties from 'pages/Properties';
import NotFound from 'pages/NotFound';
import Home from 'pages/Home';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className={styles.app}>
        <header className={styles['app-header']}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/properties" exact component={Properties} />
            <Route component={NotFound} />
          </Switch>
        </header>
      </div>
    </Router>
  );
};

export default App;
