import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types';

// TODO: Check token & load user

// As we need to make asyncronous calls here with axios, we wrap this with a dispatch
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  // getState() can look directly at the current state (refer initialState -> authReducer)
  const token = getState().auth.token;

  // Add token to headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token exists, then add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
