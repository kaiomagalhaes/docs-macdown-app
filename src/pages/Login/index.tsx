import React from 'react';
import styles from './Login.module.scss';
import { Input } from '@codelitt/ay-design-library';

const Login: React.FC = () => (
  <div className={styles['login-container']}>
    <Input
      type="text"
      label="Username"
      onChange={() => console.log('username changed')}
      id="username"
    />
    <Input
      type="text"
      label="Password"
      onChange={() => console.log('password changed')}
      id="password"
    />
  </div>
);

export default Login;
