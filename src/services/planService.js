import apiClient from '../config/ApiClient';

export const PlanService = {
  async obtenerPlanActual() {
    try {
      const response = await apiClient.get('/plan/actual');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener plan actual' };
    }
  },

  async completarTarea(planId, dia) {
    try {
      const response = await apiClient.post(`/plan/${planId}/completar`, { dia });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al completar tarea' };
    }
  },

  async obtenerHistorial() {
    try {
      const response = await apiClient.get('/plan/historial');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener historial' };
    }
  },

  async obtenerResumen() {
    try {
      const response = await apiClient.get('/progreso/resumen');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener resumen' };
    }
  },
};
