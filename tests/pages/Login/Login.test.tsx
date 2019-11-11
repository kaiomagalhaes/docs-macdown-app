import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Login from '../../../src/pages/Login';

afterEach(cleanup);

it('renders without crashing', () => {
  const login = render(<Login />);
  expect(login).toMatchSnapshot();
});
