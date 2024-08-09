import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    'x-access-token': document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1],
  },
});

export default instance;