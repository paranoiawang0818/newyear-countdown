import axios from 'axios';

// 生产环境直接使用硬编码的 API 地址
const API_URL = 'https://newyear-countdown-okq6.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Wishes API - 简化版，不需要认证
export const wishesAPI = {
  create: (content, nickname) => api.post('/wishes', { content, nickname }),
  getPublicWishes: () => api.get('/wishes/public'),
};

export default api;
