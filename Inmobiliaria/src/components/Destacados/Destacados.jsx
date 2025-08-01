import React, { useEffect, useState } from 'react';
import '../Css/Destacados.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Destacados() {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerPropiedadesDestacadas = async () => {
            try {
                const q = query(collection(db, 'propiedades'), where('destacado', '==', true));
                const querySnapshot = await getDocs(q);

                const props = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPropiedades(props);
            } catch (error) {
                console.error('Error al obtener propiedades destacadas:', error);
            } finally {
                setCargando(false);
            }
        };

        obtenerPropiedadesDestacadas();
    }, []);

    if (cargando) return <p style={{ textAlign: 'center' }}>Cargando propiedades...</p>;

    return (
        <section className="destacados">
            {propiedades.length === 0 && (
                <p style={{ textAlign: 'center' }}>No hay propiedades destacadas aún.</p>
            )}
            {propiedades.map((prop) => (
                <div className="card" key={prop.id}>
                    <img src={prop.imagenes?.[0]} alt={`Apartamento en ${prop.ciudad}`} />
                    <div className="info">
                        <p className="precio">USD {prop.precio}</p>
                        <p className="ciudad">{prop.ciudad}</p>
                        <p className="descripcion">{prop.descripcion}</p>
                        <div className="boton-contenedor">
                            <Link to={`/propiedad/${prop.id}`} className="ver-mas">Ver más detalles</Link>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
