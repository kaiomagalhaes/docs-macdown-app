import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import locations from '../../routes';

const Navbar = () => (
  <ul className={styles['list']}>
    <li>
      <NavLink to={locations.root()}>Publish</NavLink>
    </li>
  </ul>
);

export default Navbar;
