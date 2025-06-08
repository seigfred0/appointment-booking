import axios from 'axios';

const api = axios.create({
  baseURL: '', 
  timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     // Authorization: `Bearer ${token}` // if needed
//   }
});

export default api;


/*
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/