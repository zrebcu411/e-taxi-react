import axios from 'axios';
import btoa from 'btoa';

export const signIn = credentials => (dispatch) => {

  // test credentials
  const body = `username=${encodeURIComponent('admin')}&password=${encodeURIComponent('pass')}&grant_type=password`;

  return axios.post(`${process.env.REACT_APP_API_URL}/oauth/login`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // test oauth credentials
      Authorization: `Basic ${btoa('eTaxiClientId:secret')}`
    }
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
