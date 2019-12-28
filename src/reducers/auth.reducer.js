import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../axiosInstance";

const getInitialState = () => {
  const userInfo = localStorage.getItem('USER_INFO');
  if (userInfo) {
    return JSON.parse(userInfo)
  }

  return {};
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    authenticate(state, action) {
      return action.payload;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;

// Extract and export each action creator by name
const { authenticate } = actions;

export const clearLoginInfo = () => async dispatch => {
  localStorage.removeItem('USER_INFO');
  localStorage.removeItem('AUTH_TOKEN');
  dispatch(authenticate({}));
};

export const doLogin = (email, password) => async dispatch => {
  await clearLoginInfo();
  await dispatch(authenticate({}));

  const response = await axiosInstance.post('login', { user: { email, password } });

  const loginData = response.data;
  if (!loginData.error) {
    const token = response.headers['authorization'];

    localStorage.setItem('AUTH_TOKEN', token);
    localStorage.setItem('USER_INFO', JSON.stringify({ ...loginData, token }));

    dispatch(authenticate(loginData));
  }

  return loginData;
};

export const isUserLoggedIn = () => {
  return localStorage.getItem('AUTH_TOKEN') != null;
};

// Export the reducer, either as a default or named export
export default reducer
