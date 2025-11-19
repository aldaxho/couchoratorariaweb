import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          AppSwUno
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/practica" className="navbar-link">
            Práctica
          </Link>
          <Link to="/historial" className="navbar-link">
            Historial
          </Link>
          <Link to="/plan" className="navbar-link">
            Plan
          </Link>
          <Link to="/recompensas" className="navbar-link">
            Recompensas
          </Link>
        </div>

        <div className="navbar-user">
          <span className="navbar-username">{user?.correo}</span>
          <button onClick={handleLogout} className="navbar-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
