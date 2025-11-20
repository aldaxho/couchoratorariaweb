import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { PracticaService } from '../services/practicaService';
import { ShareService } from '../services/shareService';
import { useNavigate } from 'react-router-dom';
import './AnalisisPage.css';

const AnalisisPage = () => {
  const { id } = useParams();
  const [analisis, setAnalisis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAnalisis();
  }, [id]);

  const loadAnalisis = async () => {
    try {
      const data = await PracticaService.obtenerAnalisis(id);
      setAnalisis(data);
    } catch (err) {
      setError('Error al cargar el análisis');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = ShareService.getAnalysisShareText(analisis);
    const success = await ShareService.share(shareData);
    
    if (success) {
      setShareMessage('¡Compartido exitosamente!');
    } else {
      setShareMessage('Enlace copiado al portapapeles');
    }
    
    setTimeout(() => setShareMessage(''), 3000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="alert alert-error">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Análisis de tu Práctica</h1>
          <p>Revisa el análisis detallado de tu desempeño</p>
        </div>

        <div className="analisis-container">
          <Card className="calificacion-card">
            <div className="calificacion-circle">
              <div className="calificacion-value">
                {analisis?.puntuacion || 'N/A'}
              </div>
              <div className="calificacion-label">Puntuación General</div>
            </div>
          </Card>

          <Card title="Resumen y Comentario">
            <div className="feedback-section">
              <h3>Resumen</h3>
              <p>{analisis?.resumen || 'Sin resumen disponible'}</p>

              <h3>Comentario</h3>
              <p>{analisis?.comentario || 'Sin comentarios disponibles'}</p>

              {analisis?.transcripcion && (
                <>
                  <h3>Transcripción</h3>
                  <div className="transcripcion-box">
                    <p>{analisis.transcripcion}</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card title="Métricas">
            <div className="aspectos-grid">
              <div className="aspecto-item">
                <span className="aspecto-label">Muletillas</span>
                <span className="aspecto-value">{analisis?.metricas?.muletillas || 0}</span>
              </div>

              <div className="aspecto-item">
                <span className="aspecto-label">Velocidad</span>
                <span className="aspecto-value">{analisis?.metricas?.velocidad || 'N/A'}</span>
              </div>

              <div className="aspecto-item">
                <span className="aspecto-label">Palabras Total</span>
                <span className="aspecto-value">{analisis?.metricas?.palabras_total || 0}</span>
              </div>

              <div className="aspecto-item">
                <span className="aspecto-label">Duración</span>
                <span className="aspecto-value">{analisis?.metricas?.duracion_segundos || 0}s</span>
              </div>

              <div className="aspecto-item">
                <span className="aspecto-label">Contacto Visual</span>
                <span className="aspecto-value">{analisis?.metricas?.contacto_visual_porcentaje || 0}%</span>
              </div>

              <div className="aspecto-item">
                <span className="aspecto-label">Expresividad</span>
                <span className="aspecto-value">{analisis?.metricas?.expresividad_nivel || 'N/A'}</span>
              </div>
            </div>
          </Card>

          <div className="analisis-actions">
            {shareMessage && (
              <div className="share-message">
                {shareMessage}
              </div>
            )}
            <Button variant="secondary" onClick={() => navigate('/historial')}>
              Ver Historial
            </Button>
            <Button variant="success" onClick={handleShare}>
              📤 Compartir Resultado
            </Button>
            <Button variant="primary" onClick={() => navigate('/practica')}>
              Nueva Práctica
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalisisPage;
