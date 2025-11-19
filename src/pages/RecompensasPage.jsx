import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { RecompensaService } from '../services/recompensaService';
import './RecompensasPage.css';

const RecompensasPage = () => {
  const [insignias, setInsignias] = useState([]);
  const [racha, setRacha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRecompensas();
  }, []);

  const loadRecompensas = async () => {
    try {
      const [insigniasData, rachaData] = await Promise.all([
        RecompensaService.obtenerInsignias(),
        RecompensaService.obtenerRacha(),
      ]);
      setInsignias(insigniasData);
      setRacha(rachaData);
    } catch (err) {
      setError('Error al cargar recompensas');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
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
          <h1>Recompensas y Logros</h1>
          <p>Revisa tus insignias y racha de días</p>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        <Card className="racha-card">
          <div className="racha-content">
            <div className="racha-icon">🔥</div>
            <div className="racha-info">
              <div className="racha-value">{racha?.rachaActual || 0} días</div>
              <div className="racha-label">Racha Consecutiva</div>
            </div>
          </div>
          <div className="racha-best">
            <span>Mejor racha: {racha?.mejorRacha || 0} días</span>
          </div>
        </Card>

        <div className="insignias-section">
          <h2 className="section-title">Tus Insignias</h2>
          
          {insignias && insignias.length > 0 ? (
            <div className="insignias-grid">
              {insignias.map((insignia) => (
                <Card 
                  key={insignia.id} 
                  className="insignia-card insignia-obtenida"
                >
                  <div className="insignia-icon">🏅</div>
                  <h3 className="insignia-nombre">{insignia.nombre}</h3>
                  {insignia.obtenidaEn && (
                    <p className="insignia-fecha">
                      Obtenida: {new Date(insignia.obtenidaEn).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="empty-state">Aún no tienes insignias. ¡Comienza a practicar para obtenerlas!</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default RecompensasPage;
