import axios from 'axios';
import { setAxiosAuthorizationHeader } from '../helpers/authHelper';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const signIn = credentials => (dispatch) => {
  const { username, password } = credentials;

  const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  const hashedCredentials = btoa(`${username}:${password}`);

  return axios.post(`${process.env.REACT_APP_API_URL}/login`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${hashedCredentials}`
    }
  })
    .then(() => {
      localStorage.setItem('basicToken', hashedCredentials);
      setAxiosAuthorizationHeader(hashedCredentials);
      return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/current`);
    })
    .then((res) => {
      const user = res.data;
      dispatch(setCurrentUser(user));
    });
};

export const initializeUser = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/current`)
    .then(res => res.data);
};

