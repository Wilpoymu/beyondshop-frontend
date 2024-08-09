import axios from 'axios';
import { API_URL } from '../config';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    'x-access-token': document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1],
  },
});

export default instance;