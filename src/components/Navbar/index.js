import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import codelittLogo from '../../assets/images/codelitt-logo.svg'
import Link from "@material-ui/core/Link";

const Navbar = () => {
  return (
    <AppBar position="static" color='inherit'>
      <Toolbar>
        <Link href='#'>
          <img src={codelittLogo} alt='Codelitt' />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
