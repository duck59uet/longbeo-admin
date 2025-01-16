import { config } from '@/const';
import axios from 'axios';

const authInstance = axios.create({
  baseURL: config.API_ENDPOINT_URL
});
const TOKEN_PAYLOAD_KEY = 'Authorization';

authInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${token}`;
    }
  }
  return config;
});

export default authInstance;
