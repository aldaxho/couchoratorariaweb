import apiClient from '../config/ApiClient';

export const PracticaService = {
  async iniciarPractica() {
    try {
      const response = await apiClient.post('/practica/iniciar');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al iniciar práctica' };
    }
  },

  async finalizarPractica(idSesion, urlArchivo) {
    try {
      const response = await apiClient.post('/practica/finalizar', {
        idSesion,
        urlArchivo: urlArchivo || 'video_simulado.mp4'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al finalizar práctica' };
    }
  },

  async obtenerAnalisis(practicaId) {
    try {
      const response = await apiClient.get(`/practica/${practicaId}/analisis`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener análisis' };
    }
  },

  async obtenerHistorial() {
    try {
      const response = await apiClient.get('/practica/historial');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener historial' };
    }
  },

  async obtenerDetallePractica(practicaId) {
    try {
      const response = await apiClient.get(`/practica/${practicaId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener detalle de práctica' };
    }
  },
};
