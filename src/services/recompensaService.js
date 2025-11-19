import apiClient from '../config/ApiClient';

export const RecompensaService = {
  async obtenerInsignias() {
    try {
      const response = await apiClient.get('/recompensas/insignias');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener insignias' };
    }
  },

  async obtenerRacha() {
    try {
      const response = await apiClient.get('/recompensas/racha');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener racha' };
    }
  },

  async obtenerEstadisticas() {
    try {
      const response = await apiClient.get('/progreso/resumen');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener estadísticas' };
    }
  },
};
