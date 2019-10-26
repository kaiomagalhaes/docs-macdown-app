import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => (
  <ul className={styles['list']}>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/users">Users</NavLink>
    </li>
    <li>
      <NavLink to="/properties">Properties</NavLink>
    </li>
  </ul>
);

export default Navbar;
