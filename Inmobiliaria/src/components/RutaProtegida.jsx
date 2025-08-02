import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
    const { usuario, loading } = useAuth();

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Verificando sesión...</p>;
    }

    return usuario ? children : <Navigate to="/login" />;
}
