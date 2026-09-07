import React, { useState, useEffect } from 'react';
import '../Dashboard/Dashboard.css';
import http from '../../services/httpInterceptor';

const UsuariosRegister = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    username: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const [users, setUsers] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await http.get('http://localhost:9000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setMessage({
        text: 'Error al cargar la lista de usuarios',
        type: 'error'
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.documentType) {
      newErrors.documentType = 'Seleccione un tipo de documento';
    }

    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = 'El número de documento es requerido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El número telefónico es requerido';
    }

    if (!formData.username.trim()) {
      formData.username = formData.email.split('@')[0];
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {

      const userData = {
        fullName: formData.fullName,
        documentNumber: formData.documentNumber,
        documentType: formData.documentType,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        username: formData.username
      };

      await http.post('http://localhost:9000/api/users', userData);

      setMessage({
        text: 'Usuario registrado exitosamente',
        type: 'success'
      });

      resetForm();

      fetchUsers();
    } catch (error) {
      console.error('Error al registrar usuario:', error);

      let errorMessage = 'Error al registrar usuario';

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setMessage({
        text: errorMessage,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      documentType: '',
      documentNumber: '',
      phone: '',
      username: ''
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setMessage({ text: '', type: '' });
  };

  return (
      <div className="content-section">
        <h2 className="section-title">Registro de Usuarios</h2>
        <p className="section-description">
          Complete el formulario para registrar nuevos usuarios en el sistema.
        </p>

        {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
        )}

        <div className="form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nombre completo</label>
              <input
                  type="text"
                  id="fullName"
                  placeholder="Ingrese nombre completo"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'input-error' : ''}
                  disabled={isSubmitting}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                  type="email"
                  id="email"
                  placeholder="Ingrese correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                  disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Ingrese contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'input-error' : ''}
                    disabled={isSubmitting}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirme contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    disabled={isSubmitting}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="documentType">Tipo de documento</label>
                <select
                    id="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className={errors.documentType ? 'input-error' : ''}
                    disabled={isSubmitting}
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="CC">C.C</option>
                  <option value="CE">C.E</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
                {errors.documentType && <span className="error-message">{errors.documentType}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="documentNumber">Número de documento</label>
                <input
                    type="text"
                    id="documentNumber"
                    placeholder="Ingrese número de documento"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    className={errors.documentNumber ? 'input-error' : ''}
                    disabled={isSubmitting}
                />
                {errors.documentNumber && <span className="error-message">{errors.documentNumber}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Número telefónico</label>
              <input
                  type="text"
                  id="phone"
                  placeholder="Ingrese número telefónico"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                  disabled={isSubmitting}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Nombre de usuario (opcional)</label>
              <input
                  type="text"
                  id="username"
                  placeholder="Ingrese nombre de usuario o deje en blanco para usar parte del email"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isSubmitting}
              />
            </div>

            <div className="form-actions">
              <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
              </button>
              <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div className="users-table-container">
          <h3 className="table-title">Usuarios Registrados</h3>
          <table className="users-table">
            <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo de documento</th>
              <th>Número de documento</th>
              <th>Número telefónico</th>
            </tr>
            </thead>
            <tbody>
            {users.length > 0 ? (
                users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.documentType}</td>
                      <td>{user.documentNumber}</td>
                      <td>{user.phone}</td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No hay usuarios registrados
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default UsuariosRegister;