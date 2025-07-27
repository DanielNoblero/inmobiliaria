import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">COMPANIA</Link>

        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-item">Inicio</Link></li>
          <li><Link to="/alquiler" className="nav-item">Alquiler</Link></li>
          <li><Link to="/venta" className="nav-item">Venta</Link></li>
          <li><Link to="/contacto" className="nav-item">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}
