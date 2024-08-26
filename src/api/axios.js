import axios from 'axios';
import { API_URL } from '../config';

const getTokenFromCookies = () => {
  const tokenCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

// Interceptor to add token to headers before each request
instance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;