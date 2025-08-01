// src/pages/Login.jsx
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../components/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../components/Css/Login.css';

const Login = () => {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) navigate('/admin');
    }, [usuario, navigate]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Acceso restringido</h2>
                <button onClick={handleLogin}>Iniciar sesión con Google</button>
            </div>
        </div>
    );
};

export default Login;
