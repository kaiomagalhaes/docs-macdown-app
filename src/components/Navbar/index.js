import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <ul>
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
