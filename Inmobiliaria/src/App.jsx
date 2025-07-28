import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar/Navbar'
import SearchBar from './components/SearchBar/SearchBar';
import Resultados from './components/Resultados/Resultados';
import Destacados from './components/Destacados/Destacados.jsx';
import Alquiler from './Page/Alquiler.jsx';
import Venta from './Page/Venta.jsx';
import PropiedadDetalle from './components/PropiedadesDetalle/PropiedadesDetalle.jsx';

const App = () => {

  return (
    <div>
      <Nav />

      <Routes>
        <Route
  path="/"
  element={
    <>
      <div style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#2b7cff', marginBottom: '0.5rem' }}>
          Encuentra tu apartamento soñado
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#444' }}>
          Explora los apartamentos en venta y alquiler
        </p>
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
      </Routes>

    </div>

  );
};

export default App
