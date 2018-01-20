import axios from 'axios';
import store from '../store/configureStore';

export const setAxiosAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Basic ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const isAuthenticated = () => store.getState().user.isAuthenticated;

export const getUserRole = () => store.getState().user.role;
