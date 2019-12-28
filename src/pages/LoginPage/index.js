import React, {useEffect, useState} from 'react';
import {
  TextField,
  Paper,
  Button,
  Typography,
  Container,
} from '@material-ui/core';
import connect from "react-redux/es/connect/connect";
import {doLogin} from "../../reducers/auth.reducer";
import styles from './LoginPage.module.scss';
import routes from '../../routes';

const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.clear();
  }, []);

  const login = async (e) => {
    e.preventDefault();

    setMessage('');

    const loginResp = await props.doLogin(username, password);

    if (loginResp.id != null) {
      const locationState = props.location.state;
      let redirectPath = routes.getNewFilePath();
      if (locationState && locationState.from.pathname) {
        redirectPath = locationState.from.pathname;
      }
      props.history.push(redirectPath);
    } else {
      setMessage('Invalid credentials')
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper className={styles['form-container']}>
        <Typography variant="h4" className={styles.center}>Sign In</Typography>
        <form>
          <Typography variant="h5" className={styles.notification}>{message}</Typography>
          <TextField type="text" label="USERNAME" fullWidth margin="normal" name="username"
                     value={username} onChange={(e) => setUsername(e.target.value)}/>

          <TextField type="password" label="PASSWORD" fullWidth margin="normal" name="password"
                     value={password} onChange={(e) => setPassword(e.target.value)}/>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={login}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => dispatch(doLogin(email, password))
});

export default connect(null, mapDispatchToProps)(LoginPage);
