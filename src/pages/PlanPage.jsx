import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { PlanService } from '../services/planService';
import './PlanPage.css';

const PlanPage = () => {
  const [plan, setPlan] = useState(null);
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
            <Card className="plan-progress-card">
              <div className="progress-header">
                <div>
                  <h3>Plan Semanal</h3>
                  <p className="progress-subtitle">
                    {plan.objetivos ? plan.objetivos.join(', ') : 'Mejora continua'}
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
                {plan.tareas?.filter(t => t.completada).length || 0} de {plan.tareas?.length || 0} tareas completadas
              </p>
            </Card>

            <div className="tareas-container">
              <h2 className="section-title">Tareas de la Semana</h2>
              {plan.tareas && plan.tareas.length > 0 ? (
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
