import apiClient from '../config/ApiClient';
import { TokenManager } from '../utils/tokenManager';

export const AuthService = {
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/registrar', userData);
      if (response.data.token) {
        TokenManager.setToken(response.data.token);
        const user = { id: response.data.id, correo: response.data.correo };
        TokenManager.setUser(user);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al registrar usuario' };
    }
  },

  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.data.token) {
        TokenManager.setToken(response.data.token);
        // Obtener info del usuario
        const userResponse = await apiClient.get('/auth/yo');
        const user = userResponse.data;
        TokenManager.setUser(user);
        return { ...response.data, user };
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  async loginWithGoogle(googleToken) {
    try {
      const response = await apiClient.post('/auth/google', { token: googleToken });
      if (response.data.token) {
        TokenManager.setToken(response.data.token);
        TokenManager.setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al iniciar sesión con Google' };
    }
  },

  logout() {
    TokenManager.clear();
  },

  getCurrentUser() {
    return TokenManager.getUser();
  },

  isAuthenticated() {
    return !!TokenManager.getToken();
  },
};
