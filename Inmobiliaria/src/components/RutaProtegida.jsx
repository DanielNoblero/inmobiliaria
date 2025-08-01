// src/components/RutaProtegida.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
    const { usuario } = useAuth();

    if (!usuario) return <Navigate to="/login" />;

    return children;
};

export default RutaProtegida;
