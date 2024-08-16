import axios from 'axios';
import { API_URL } from '../config';

const getTokenFromCookies = () => {
  const tokenCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const token = getTokenFromCookies();

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    ...(token && { 'x-access-token': token }),
  },
});

export default instance;
