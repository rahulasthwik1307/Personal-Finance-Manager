import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
instance.interceptors.request.use(config => {
  // Add cache busting for GET requests
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _: Date.now(),
    };
  }

  // Ensure cookies are sent and add Authorization header
  config.headers['Content-Type'] = 'application/json';
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor with enhanced backoff
instance.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    const status = error.response?.status;

    if (status === 429) {
      if (!config._retryCount) config._retryCount = 0;

      const maxRetries = 3;
      if (config._retryCount >= maxRetries) {
        return Promise.reject(error);
      }

      const delay = Math.pow(2, config._retryCount) * 1000;
      config._retryCount += 1;

      await new Promise(resolve => setTimeout(resolve, delay));
      return instance(config);
    }

    return Promise.reject(error);
  }
);

export const api = instance;