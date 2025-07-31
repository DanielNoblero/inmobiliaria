import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';
import Logo from '../Multimedia/Logo2.jpg'; // Asegúrate de que la ruta sea correcta

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img
            src={Logo}
            alt="Logo Vallarino"
            style={{
              height: '40px',
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          />
          VALLARINO
        </Link>

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
