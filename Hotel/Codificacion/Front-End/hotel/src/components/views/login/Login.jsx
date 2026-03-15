import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asumiendo que usas react-router
import authService from '../../services/authService';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setLoginMessage('');

      try {
        await authService.login(email, password);

        setLoginMessage('¡Inicio de sesión exitoso!');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);

      } catch (error) {
        console.error('Error de inicio de sesión:', error);

        if (error.response) {
          if (error.response.status === 401) {
            setLoginMessage('Credenciales incorrectas. Verifique su email y contraseña.');
          } else {
            setLoginMessage(`Error al iniciar sesión (${error.response.status}). Intente nuevamente.`);
          }
        } else if (error.request) {
          setLoginMessage('No se pudo conectar con el servidor. Verifique su conexión a internet.');
        } else {
          setLoginMessage('Error al procesar su solicitud. Intente nuevamente.');
        }

        setIsSubmitting(false);
      }
    }
  };

  return (
      <div className="login-container">
        <div className="login-form-container">
          {/* Logo o título con estilo similar al header del homepage */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFD700', marginRight: '8px', fontSize: '24px' }}>★</span>
              <h2 style={{ margin: '0' }}>Iniciar Sesión</h2>
            </div>
          </div>

          {loginMessage && (
              <div className={`message ${loginMessage.includes('exitoso') ? 'success' : 'error'}`}>
                {loginMessage}
              </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'input-error' : ''}
                  placeholder="correo@ejemplo.com"
                  disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'input-error' : ''}
                  placeholder="Tu contraseña"
                  disabled={isSubmitting}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" disabled={isSubmitting} className="login-button">
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>

          </form>
        </div>
      </div>
  );
}

export default Login;