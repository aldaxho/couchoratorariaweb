export const ShareService = {
  /**
   * Comparte contenido usando Web Share API si está disponible
   * @param {Object} data - Datos a compartir {title, text, url}
   * @returns {Promise<boolean>} - true si se compartió exitosamente
   */
  async share(data) {
    // Verificar si el navegador soporta Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title || 'AppSwUno',
          text: data.text || '',
          url: data.url || window.location.href
        });
        return true;
      } catch (error) {
        if (error.name === 'AbortError') {
          // El usuario canceló el compartir
          return false;
        }
        console.error('Error al compartir:', error);
        return false;
      }
    } else {
      // Fallback: copiar al portapapeles
      return this.copyToClipboard(data);
    }
  },

  /**
   * Copia el texto al portapapeles como fallback
   */
  async copyToClipboard(data) {
    try {
      const textToShare = `${data.title || 'AppSwUno'}\n${data.text || ''}\n${data.url || window.location.href}`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToShare);
        return true;
      } else {
        // Fallback antiguo para navegadores sin clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = textToShare;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
          document.execCommand('copy');
          document.body.removeChild(textArea);
          return true;
        } catch (err) {
          document.body.removeChild(textArea);
          return false;
        }
      }
    } catch (error) {
      console.error('Error al copiar:', error);
      return false;
    }
  },

  /**
   * Verifica si Web Share API está disponible
   */
  isShareSupported() {
    return !!navigator.share;
  },

  /**
   * Genera un texto para compartir análisis
   */
  getAnalysisShareText(analisis) {
    return {
      title: '¡Mi progreso en AppSwUno! 🎯',
      text: `Acabo de completar una práctica de oratoria y obtuve ${analisis.puntuacion || 'N/A'} puntos. ¡Sigue mejorando tus habilidades de comunicación con AppSwUno!`,
      url: window.location.href
    };
  },

  /**
   * Genera un texto para compartir logros
   */
  getAchievementShareText(achievement) {
    return {
      title: '¡Nuevo logro desbloqueado! 🏆',
      text: `Acabo de desbloquear "${achievement.nombre}" en AppSwUno. ${achievement.descripcion}`,
      url: window.location.origin
    };
  },

  /**
   * Genera un texto para compartir racha
   */
  getStreakShareText(streak) {
    return {
      title: '🔥 ¡Mi racha en AppSwUno!',
      text: `¡He mantenido una racha de ${streak} días practicando oratoria! ¿Te unes al desafío?`,
      url: window.location.origin
    };
  }
};
