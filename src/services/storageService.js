import { supabase, isSupabaseConfigured } from '../config/supabaseClient';

export const StorageService = {
  /**
   * Sube un video a Supabase Storage
   * @param {File} file - Archivo de video
   * @param {string} userId - ID del usuario
   * @returns {Promise<{url: string, path: string}>}
   */
  async uploadVideo(file, userId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado. Por favor, configura las variables de entorno.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `video_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading video:', error);
      throw new Error(`Error al subir el video: ${error.message}`);
    }

    // Obtener URL pública del video
    const { data: urlData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath
    };
  },

  /**
   * Elimina un video de Supabase Storage
   * @param {string} path - Ruta del archivo en storage
   */
  async deleteVideo(path) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado.');
    }

    const { error } = await supabase.storage
      .from('videos')
      .remove([path]);

    if (error) {
      console.error('Error deleting video:', error);
      throw new Error(`Error al eliminar el video: ${error.message}`);
    }
  },

  /**
   * Obtiene la URL pública de un video
   * @param {string} path - Ruta del archivo en storage
   */
  getPublicUrl(path) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado.');
    }

    const { data } = supabase.storage
      .from('videos')
      .getPublicUrl(path);

    return data.publicUrl;
  },

  /**
   * Lista todos los videos de un usuario
   * @param {string} userId - ID del usuario
   */
  async listUserVideos(userId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado.');
    }

    const { data, error } = await supabase.storage
      .from('videos')
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error listing videos:', error);
      throw new Error(`Error al listar videos: ${error.message}`);
    }

    return data;
  }
};
