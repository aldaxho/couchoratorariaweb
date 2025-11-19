import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PracticaPage from './pages/PracticaPage';
import AnalisisPage from './pages/AnalisisPage';
import HistorialPage from './pages/HistorialPage';
import PlanPage from './pages/PlanPage';
import RecompensasPage from './pages/RecompensasPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/practica"
            element={
              <ProtectedRoute>
                <PracticaPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/analisis/:id"
            element={
              <ProtectedRoute>
                <AnalisisPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/historial"
            element={
              <ProtectedRoute>
                <HistorialPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/recompensas"
            element={
              <ProtectedRoute>
                <RecompensasPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
