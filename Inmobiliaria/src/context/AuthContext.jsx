import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true); // <- estado de carga

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            setLoading(false); // <- importante
        });
        return () => unsubscribe();
    }, []);

    const cerrarSesion = () => firebaseSignOut(auth);

    return (
        <AuthContext.Provider value={{ usuario, loading, signOut: cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
