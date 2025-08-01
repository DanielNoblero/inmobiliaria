import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar/Navbar'
import SearchBar from './components/SearchBar/SearchBar';
import Resultados from './components/Resultados/Resultados';
import Destacados from './components/Destacados/Destacados.jsx';
import Alquiler from './Page/Alquiler.jsx';
import Venta from './Page/Venta.jsx';
import PropiedadDetalle from './components/PropiedadesDetalle/PropiedadesDetalle.jsx';
import WhatsAppWidget from './components/WhatsApp/WhatsApp.jsx';
import Footer from './components/Footer/Footer.jsx';
import './components/Css/Logo.css'
import Admin from './components/Admin/Admin.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';
import Login from './Page/Login.jsx';


const App = () => {

  return (
    <div>
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="logo-container">
                <img
                  src="/Logo.jpg"
                  alt="Logo Vallarino"
                  className="logo-img"
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
  <img
    src="/Inmobiliaria/src/components/Multimedia/Logo.jpg"
    alt="Logo Vallarino"
    style={{
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      marginBottom: '1rem',
      borderRadius: '1rem',
    }}
  />
</div>

              <SearchBar />
              <Destacados />
            </>
          }
        />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/alquiler" element={<Alquiler />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/propiedad/:id" element={<PropiedadDetalle />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
        <Route path="/login" element={<Login />} />

      </Routes>
      <WhatsAppWidget />
      <Footer />
    </div>

  );
};

export default App
