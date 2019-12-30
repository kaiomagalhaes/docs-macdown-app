import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import codelittLogo from '../../assets/images/codelitt-logo.svg'
import { Link } from "@material-ui/core";
import styles from './Navbar.module.scss';
import locations from "../../routes";
import {isUserLoggedIn} from "../../reducers/auth.reducer";

const getAdminLinks = () => {
  if (!isUserLoggedIn()) {
    return null;
  }

  return (
    <React.Fragment>
      <Button className={styles.btn} color="secondary" variant="contained" href={locations.getNewFilePath()}>
        New File
      </Button>
    </React.Fragment>
  )
}

const Navbar = ({ buttons, color }) => (
  <AppBar position="static" color={color || 'inherit'}>
    <Toolbar className={styles.nav}>
      <Link href={locations.getHomePath()}>
        <img src={codelittLogo} alt='Codelitt' />
      </Link>
      <div>
        {getAdminLinks()}

        {buttons.map(({ onClick, title, type, href, show }, index) => {
          if (type === 'button' && show) {
            return (
              <Button className={styles.btn} color="secondary" variant="contained" key={index} onClick={onClick}>
                {title}
              </Button>
            )
          } else if (type === 'link' && show) {
            return (
              <Button className={styles.btn} color="secondary" variant="contained" key={index} href={href}>
                {title}
              </Button>
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
