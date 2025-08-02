import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // ✅ Importación necesaria
import './components/Css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Inmobiliaria">
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
