import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';     

// Importar componentes principales
import Dashboard from './components/views/Dashboard/Dashboard';

// Importar vistas
import HomePage from './components/views/homePage/HomePage';
import UsuariosRegister from './components/views/userRegister/userRegister';
import HotelRegister from './components/views/hotelRegiter/hotelRegister';
import Login from './components/views/login/Login';
import HomeContent from "./components/views/Dashboard/HomeContent";
import RentasRegister from './components/views/rent/rent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage>
            <HomePage /> {}
          </HomePage>
        } />
        <Route path="/login" element={
          <Login>
            <UsuariosRegister />
          </Login>
        } />
        <Route path="/usuarios" element={
          <Dashboard>
            <UsuariosRegister />
          </Dashboard>
        } />
        <Route path="/hotel" element={
          <Dashboard>
            <HotelRegister />
          </Dashboard>
        } />
        <Route path="/dashboard" element={
          <Dashboard>
            <HomeContent>
            </HomeContent>
          </Dashboard>
        } />
        <Route path="/alquiler" element={
          <Dashboard>
            <RentasRegister>
            </RentasRegister>
          </Dashboard>
        } />
      </Routes>
    </Router>
  );
}

export default App;