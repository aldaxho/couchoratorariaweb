import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import ProgressChart from '../components/ProgressChart';
import { PlanService } from '../services/planService';
import './PlanPage.css';

const PlanPage = () => {
  const [plan, setPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('actual'); // 'actual', 'historial', 'progreso'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    try {
      const data = await PlanService.obtenerPlanActual();
      setPlan(data);
    } catch (err) {
      setError('Error al cargar el plan');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompletarTarea = async (planId, dia) => {
    try {
      await PlanService.completarTarea(planId, dia);
      // Recargar plan
      await loadPlan();
    } catch (err) {
      setError('Error al completar la tarea');
      console.error('Error:', err);
    }
  };

  const calcularProgreso = () => {
    if (!plan || !plan.tareas) return 0;
    const completadas = plan.tareas.filter(t => t.completada).length;
    return (completadas / plan.tareas.length) * 100;
  };

  const getProgressChartData = () => {
    // Datos de ejemplo - en producción vendría del backend
    const labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
    const values = [60, 75, 85, calcularProgreso()];
    return { labels, values };
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'actual':
        return renderPlanActual();
      case 'historial':
        return renderHistorial();
      case 'progreso':
        return renderProgreso();
      default:
        return renderPlanActual();
    }
  };

  const renderPlanActual = () => (
    <>
      <Card className="plan-progress-card">
        <div className="progress-header">
          <div>
            <h3>Plan Semanal</h3>
            <p className="progress-subtitle">
              {plan?.objetivos ? plan.objetivos.join(', ') : 'Mejora continua'}
            </p>
          </div>
          <div className="progress-percentage">
            {calcularProgreso().toFixed(0)}%
          </div>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${calcularProgreso()}%` }}
          ></div>
        </div>
        <p className="progress-info">
          {plan?.tareas?.filter(t => t.completada).length || 0} de {plan?.tareas?.length || 0} tareas completadas
        </p>
      </Card>

      <div className="tareas-container">
        <h2 className="section-title">Tareas de la Semana</h2>
        {plan?.tareas && plan.tareas.length > 0 ? (
          <div className="tareas-grid">
            {plan.tareas.map((tarea, index) => (
              <Card 
                key={index} 
                className={`tarea-card ${tarea.completada ? 'tarea-completada' : ''}`}
              >
                <div className="tarea-header">
                  <div className="tarea-day">Día {tarea.dia}</div>
                  {tarea.completada && (
                    <span className="tarea-check">✓</span>
                  )}
                </div>
                
                <h3 className="tarea-title">Tarea del día {tarea.dia}</h3>
                <p className="tarea-description">{tarea.tarea}</p>

                {!tarea.completada && (
                  <Button
                    variant="primary"
                    size="small"
                    fullWidth
                    onClick={() => handleCompletarTarea(plan.id, tarea.dia)}
                  >
                    Marcar como Completada
                  </Button>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="empty-state">No hay tareas disponibles</p>
          </Card>
        )}
      </div>
    </>
  );

  const renderHistorial = () => (
    <Card>
      <div className="historial-container">
        <h3>Planes Anteriores</h3>
        <div className="historial-list">
          <div className="historial-item">
            <div className="historial-info">
              <h4>Plan Semana 1</h4>
              <p>Completado hace 1 semana</p>
            </div>
            <div className="historial-stats">
              <span className="badge badge-success">100% completado</span>
            </div>
          </div>
          <div className="historial-item">
            <div className="historial-info">
              <h4>Plan Semana 2</h4>
              <p>Completado hace 2 semanas</p>
            </div>
            <div className="historial-stats">
              <span className="badge badge-success">85% completado</span>
            </div>
          </div>
          <p className="empty-state-small">Más planes se mostrarán aquí cuando estén disponibles en el backend</p>
        </div>
      </div>
    </Card>
  );

  const renderProgreso = () => (
    <div className="progreso-container">
      <Card title="Evolución Semanal">
        <ProgressChart 
          data={getProgressChartData()} 
          label="Porcentaje de Completado"
          color="#1e3a8a"
        />
      </Card>

      <div className="stats-grid-mini">
        <Card className="stat-card-mini">
          <div className="stat-icon-mini">📊</div>
          <div className="stat-value-mini">{calcularProgreso().toFixed(0)}%</div>
          <div className="stat-label-mini">Progreso Actual</div>
        </Card>
        
        <Card className="stat-card-mini">
          <div className="stat-icon-mini">✅</div>
          <div className="stat-value-mini">{plan?.tareas?.filter(t => t.completada).length || 0}</div>
          <div className="stat-label-mini">Tareas Completadas</div>
        </Card>
        
        <Card className="stat-card-mini">
          <div className="stat-icon-mini">📝</div>
          <div className="stat-value-mini">{plan?.tareas?.length || 0}</div>
          <div className="stat-label-mini">Total de Tareas</div>
        </Card>
      </div>
    </div>
  );

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

  if (error && !plan) {
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
          <h1>Plan de Entrenamiento</h1>
          <p>Sigue tu plan semanal personalizado</p>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {plan ? (
          <>
            <div className="tabs-container">
              <button 
                className={`tab ${activeTab === 'actual' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('actual')}
              >
                Plan Actual
              </button>
              <button 
                className={`tab ${activeTab === 'historial' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('historial')}
              >
                Historial
              </button>
              <button 
                className={`tab ${activeTab === 'progreso' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('progreso')}
              >
                Progreso
              </button>
            </div>

            {renderContent()}
          </>
        ) : (
          <Card>
            <div className="empty-state">
              <p>No tienes un plan activo en este momento</p>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default PlanPage;
