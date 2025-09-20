import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout and error handling
  timeout: 10000, // Increased timeout
});

const checkServerHealth = async () => {
  try {
    await axios.get(`${API_BASE_URL}/auth/health`, {
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// Add retry functionality for failed requests
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    config.retryCount = config.retryCount || 0;

    if (config.retryCount === 0) {
      const isHealthy = await checkServerHealth();
      if (!isHealthy) {
        toast.error('Server is not available. Please try again later.');
        return Promise.reject(error);
      }
    }

    if (error.code === 'ERR_NETWORK' && config.retryCount < 3) {
      config.retryCount += 1;
      console.log(`Retrying request (${config.retryCount}/3)...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * config.retryCount));
      return api(config);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add auth token
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
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
};


// Sweet API
export const sweetAPI = {
  getAllSweets: () => api.get('/sweets'),
  getSweetById: (id) => api.get(`/sweets/${id}`),
  createSweet: (sweetData) => api.post('/sweets', sweetData),
  updateSweet: (id, sweetData) => api.put(`/sweets/${id}`, sweetData),
  deleteSweet: (id) => api.delete(`/sweets/${id}`),
  searchSweets: (params) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    return api.get(`/sweets/search?${queryParams.toString()}`);
  },
  purchaseSweet: (id, quantity) => api.post(`/sweets/${id}/purchase`, { quantity }),
  restockSweet: (id, quantity) => api.post(`/sweets/${id}/restock`, { quantity }),
};

export default api;


