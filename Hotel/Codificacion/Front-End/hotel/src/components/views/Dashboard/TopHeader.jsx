import React, { useState } from 'react';
import './Dashboard.css';

const TopHeader = ({ pageTitle, toggleSidebar, sidebarOpen }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  // Función para mostrar/ocultar el menú de logout
  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo, limpiar el localStorage, eliminar tokens, etc.
    localStorage.removeItem('token'); // Asumiendo que guardas el token en localStorage
    localStorage.removeItem('user');
    
    // Redirigir al usuario a la página de login
    window.location.href = '/';
  };

  return (
    <header className="top-header">
      <div className="header-container">
        <div className="header-left">
          <button 
            className="menu-button"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "◀" : "☰"}
          </button>
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="header-right">
          <div className="search-container">
            <span className="search-icon">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="search-input"
            />
          </div>
          <button className="notification-button">
            🔔
          </button>
          <div className="user-profile">
            <div 
              className="user-avatar" 
              onClick={toggleLogoutMenu}
              title="Haga clic para opciones de usuario"
            >
              U
            </div>
            {showLogoutMenu && (
              <div className="logout-dropdown">
                <button 
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;