import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Importar componentes
import SidebarItem from './sidebard';
import TopHeader from './TopHeader';

const Dashboard = ({ children }) => {
  // Estado para controlar la apertura del sidebar
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para ajustar sidebar en cambio de tamaño de ventana
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

  // Obtener el título de la página actual
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
      {/* Sidebar - visible/oculto para todos los dispositivos según estado */}
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
        {/* Barra superior - fija */}
        <TopHeader 
          pageTitle={getPageTitle()} 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen} 
        />

        {/* Contenido dinámico del dashboard */}
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;