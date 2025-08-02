import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase'; // Ajusta ruta según tu proyecto
import Filtros from '../components/Filtro/Filtros';
import PropiedadesLista from '../components/PropiedadesLista/PropiedadesLista';
import '../components/Css/Destacados.css';

export default function Alquiler() {
    const [filtros, setFiltros] = useState({ precioMin: '', precioMax: '', barrio: '' });
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchPropiedades = async () => {
            setCargando(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'propiedades'));
                const props = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPropiedades(props);
            } catch (error) {
                console.error('Error cargando propiedades:', error);
            }
            setCargando(false);
        };

        fetchPropiedades();
    }, []);

    // Filtrar propiedades que sean tipo 'alquier' y cumplan los filtros
    const filtradas = propiedades.filter((p) => {
        if (p.tipo !== 'alquiler') return false;

        const cumpleMin = filtros.precioMin === '' || p.precio >= parseInt(filtros.precioMin);
        const cumpleMax = filtros.precioMax === '' || p.precio <= parseInt(filtros.precioMax);
        // Considera que el campo barrio existe en tus documentos, o adapta según tu esquema
        const cumpleBarrio =
            filtros.barrio === '' ||
            (p.barrio && p.barrio.toLowerCase().includes(filtros.barrio.toLowerCase()));

        return cumpleMin && cumpleMax && cumpleBarrio;
    });

    return (
        <div style={{ padding: '2rem', marginTop: '20rem' }}>
            <h2 style={{ color: 'Black', textAlign: 'center' }}>Propiedades en alquiler</h2>

            <Filtros filtros={filtros} setFiltros={setFiltros} />

            {cargando ? <p>Cargando propiedades...</p> : <PropiedadesLista propiedades={filtradas} />}
        </div>
    );
}
