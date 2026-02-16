import axios from 'axios';

// 生产环境直接使用硬编码的 API 地址
const API_URL = 'https://newyear-countdown-okq6.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (username, password) =>
    api.post('/auth/register', { username, password }),
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
  getMe: () => api.get('/auth/me'),
};

// Wishes API
export const wishesAPI = {
  create: (content) => api.post('/wishes', { content }),
  getMyWishes: () => api.get('/wishes/mine'),
  getAllWishes: () => api.get('/wishes/all'),
  getPublicWishes: () => api.get('/wishes/public'),
  updateVisibility: (id, isVisible) =>
    api.patch(`/wishes/${id}/visibility`, { isVisible }),
  delete: (id) => api.delete(`/wishes/${id}`),
};

export default api;
