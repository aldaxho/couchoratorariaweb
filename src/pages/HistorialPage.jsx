import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { PracticaService } from '../services/practicaService';
import { useNavigate } from 'react-router-dom';
import './HistorialPage.css';

const HistorialPage = () => {
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadHistorial();
  }, []);

  const loadHistorial = async () => {
    try {
      const data = await PracticaService.obtenerHistorial();
      setPracticas(data);
    } catch (err) {
      setError('Error al cargar el historial');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Historial de Prácticas</h1>
          <p>Revisa todas tus prácticas anteriores</p>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {practicas && practicas.length > 0 ? (
          <div className="historial-grid">
            {practicas.map((practica) => (
              <Card key={practica.id} className="historial-card">
                <div className="historial-header">
                  <div>
                    <h3 className="historial-title">
                      Práctica #{practica.id}
                    </h3>
                    <p className="historial-date">
                      {formatDate(practica.fecha)}
                    </p>
                  </div>
                  <div className="historial-score">
                    {practica.puntuacion || 'N/A'}
                  </div>
                </div>

                <div className="historial-stats">
                  <div className="stat-mini">
                    <span className="stat-mini-label">Puntuación</span>
                    <span className="stat-mini-value">{practica.puntuacion || 'N/A'}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="small"
                  fullWidth
                  onClick={() => navigate(`/analisis/${practica.id}`)}
                >
                  Ver Análisis Completo
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="empty-state">
              <p>Aún no tienes prácticas registradas</p>
              <Button
                variant="primary"
                onClick={() => navigate('/practica')}
              >
                Iniciar Primera Práctica
              </Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default HistorialPage;
