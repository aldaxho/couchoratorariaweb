import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ProgressChart from '../components/ProgressChart';
import StreakChart from '../components/StreakChart';
import { RecompensaService } from '../services/recompensaService';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [racha, setRacha] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para los gráficos
  const getProgressData = () => {
    // En producción, estos datos vendrían del backend
    const today = new Date();
    const labels = [];
    const values = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('es', { weekday: 'short' }));
      values.push(Math.floor(Math.random() * 5) + (stats?.totalPracticas ? 1 : 0));
    }
    
    return { labels, values };
  };

  const getScoreProgressData = () => {
    // Datos de ejemplo de puntuaciones de las últimas 10 prácticas
    const labels = Array.from({ length: 10 }, (_, i) => `P${i + 1}`);
    const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 30) + 70);
    
    return { labels, values };
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, rachaData] = await Promise.all([
        RecompensaService.obtenerEstadisticas(),
        RecompensaService.obtenerRacha(),
      ]);
      setStats(statsData);
      setRacha(rachaData);
    } catch (error) {
      console.error('Error al cargar dashboard:', error);
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
          <h1>Bienvenido, {user?.correo}</h1>
          <p>Continúa mejorando tus habilidades de oratoria</p>
        </div>

        <div className="stats-grid">
          <Card className="stat-card stat-card-primary">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{racha?.rachaActual || 0}</div>
            <div className="stat-label">Días de Racha</div>
          </Card>

          <Card className="stat-card stat-card-success">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{stats?.totalPracticas || 0}</div>
            <div className="stat-label">Prácticas Realizadas</div>
          </Card>

          <Card className="stat-card stat-card-info">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{stats?.insignias_obtenidas || 0}</div>
            <div className="stat-label">Insignias Obtenidas</div>
          </Card>

          <Card className="stat-card stat-card-warning">
            <div className="stat-icon">📊</div>
            <div className="stat-value">
              {stats?.puntuacionPromedio || '0'}
            </div>
            <div className="stat-label">Puntuación Promedio</div>
          </Card>
        </div>

        <div className="dashboard-grid">
          <Card title="Progreso Semanal">
            <StreakChart data={getProgressData()} />
          </Card>

          <Card title="Evolución de Puntuaciones">
            <ProgressChart 
              data={getScoreProgressData()} 
              label="Puntuación"
              color="#10b981"
            />
          </Card>
        </div>

        <div className="dashboard-grid">
          <Card title="Estadísticas Detalladas">
            <div className="progress-container">
              <div className="progress-item">
                <span>Total de prácticas</span>
                <strong>{stats?.totalPracticas || 0}</strong>
              </div>
              <div className="progress-item">
                <span>Puntuación promedio</span>
                <strong>{stats?.puntuacionPromedio || '0'}</strong>
              </div>
              <div className="progress-item">
                <span>Última práctica</span>
                <strong>{stats?.ultimaPractica ? new Date(stats.ultimaPractica).toLocaleDateString() : 'N/A'}</strong>
              </div>
            </div>
          </Card>

          <Card title="Racha Actual">
            <div className="achievements-list">
              <div className="achievement-item">
                <span className="achievement-icon">🔥</span>
                <div>
                  <div className="achievement-name">Racha de {racha?.rachaActual || 0} {racha?.unidad || 'días'}</div>
                  <div className="achievement-desc">¡Sigue practicando para mantener tu racha!</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
