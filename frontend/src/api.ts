import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from your .env
  withCredentials: true,                  // important for cookies
});

export default api;