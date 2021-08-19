import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth/login');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Register User
export const register = (username, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      '/user/register',
      { username: username, email: email, password: password },
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data,
      },
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
      //console.log(err.response.data.msg);
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      '/auth/login',
      { email: email, password: password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data,
      },
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
      //console.log(err.response.data.msg);
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
