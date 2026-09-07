import React, { useState } from 'react';
import './Dashboard.css';

const TopHeader = ({ pageTitle, toggleSidebar, sidebarOpen }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

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