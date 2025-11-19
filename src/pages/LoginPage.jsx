import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.correo) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido';
    }

    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es requerida';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>AppSwUno</h1>
          <p>Mejora tus habilidades de oratoria</p>
        </div>

        <Card className="login-card">
          <h2 className="login-title">Iniciar Sesión</h2>
          
          {serverError && (
            <div className="alert alert-error">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              error={errors.correo}
              placeholder="tu@correo.com"
            />

            <Input
              label="Contraseña"
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              error={errors.contrasena}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="login-footer">
            <p>
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
