import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import codelittLogo from '../../assets/images/codelitt-logo.svg'
import { Link } from "@material-ui/core";

import styles from './Navbar.module.scss';

const Navbar = ({ buttons }) => (
  <AppBar position="static" color='inherit'>
    <Toolbar className={styles.nav}>
      <Link href='#'>
        <img src={codelittLogo} alt='Codelitt' />
      </Link>
      <div>
        {buttons.map(({ onClick, title, type, href, show }, index) => {
          if (type === 'button' && show) {
            return (
              <Button className={styles.btn} color="secondary" variant="contained" key={index} onClick={onClick}>
                {title}
              </Button>
            )
          } else if (type === 'link' && show) {
            return (
              <Link className={styles.btn} key={index} href={href}>
                {title}
              </Link>
            )
          }
        })}
      </div>
    </Toolbar>
  </AppBar>
);

Navbar.defaultProps = {
  buttons: []
}

export default Navbar;