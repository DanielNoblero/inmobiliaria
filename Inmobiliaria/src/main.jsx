import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; 
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import './components/Css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter > 
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
