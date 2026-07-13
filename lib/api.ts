import axios from 'axios';

// Create a global Axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor to inject the Sanctum Bearer token
api.interceptors.request.use(
  (config) => {
    // We assume the token is stored in localStorage for the hackathon
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('skinsaver_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle common API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g. redirect to login or clear token)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('skinsaver_token');
      }
    }
    return Promise.reject(error);
  }
);
