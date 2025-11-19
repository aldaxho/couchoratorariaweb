import axios from 'axios';
import AppConfig from './AppConfig';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: AppConfig.I.baseUrl,
      timeout: AppConfig.I.connectTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token a todas las peticiones
    this.client.interceptors.request.use(
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

    // Interceptor para manejar respuestas y errores
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, config = {}) {
    return this.client.get(url, config);
  }

  async post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  async put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  async patch(url, data, config = {}) {
    return this.client.patch(url, data, config);
  }
}

export default new ApiClient();
