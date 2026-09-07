import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

import SidebarItem from './sidebard';
import TopHeader from './TopHeader';

const Dashboard = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getPageTitle = () => {
    const path = location.pathname;

    switch(path) {
      case '/usuarios':
        return 'Registro de Usuarios';
      case '/hotel':
        return 'Registro de Hotel';
      case '/habitacion':
        return 'Registro de Habitación';
      case '/ayuda':
        return 'Centro de Ayuda';
      case '/':
      default:
        return 'Panel de Control';
    }
  };

  return (
    <div className="dashboard-container">

      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <span className="star-icon">★</span>
            <h2 className="sidebar-title">Collection Royal</h2>
          </div>
          <button
            className="close-button"
            onClick={toggleSidebar}
          >
            <span>✕</span>
          </button>
        </div>
        <nav className="sidebar-nav">
          <SidebarItem
            icon="🏠"
            text="Inicio"
            to="/dashboard"
            active={location.pathname === '/dashboard'}
          />
          <SidebarItem
            icon="📒"
            text="Registrar usuarios"
            to="/usuarios"
            active={location.pathname === '/usuarios'}
          />
          <SidebarItem
            icon="🏩"
            text="Registrar hotel"
            to="/hotel"
            active={location.pathname === '/hotel'}
          />
          <SidebarItem
            icon="💰"
            text="Registro venta"
            to="/Alquiler"
            active={location.pathname === '/Alquiler'}
          />
        </nav>
      </div>

      <div className={`main-content ${sidebarOpen ? 'content-with-sidebar' : ''}`}>

        <TopHeader
          pageTitle={getPageTitle()}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;