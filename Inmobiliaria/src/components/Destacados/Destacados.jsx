import React from 'react';
import '../Css/Destacados.css';
import apt1 from '../Multimedia/apartamento1.jpeg';
import apt2 from '../Multimedia/apartamento2.jpeg';
import { Link } from 'react-router-dom';

const propiedades = [
    {
        id: 1,
        imagen: apt1,
        precio: 'USD 120,000',
        ciudad: 'Montevideo',
        descripcion: 'Hermoso apartamento cerca del parque',
    },
    {
        id: 2,
        imagen: apt2,
        precio: 'USD 85,000',
        ciudad: 'Canelones',
        descripcion: 'Apartamento luminoso y moderno',
    },
    // Podés agregar más aquí
];

export default function Destacados() {
    return (
        <section className="destacados">
            {propiedades.map((prop) => (
                <div className="card" key={prop.id}>
                    <img src={prop.imagen} alt="Apartamento" />
                    <div className="info">
                        <p className="precio">{prop.precio}</p>
                        <p className="ciudad">{prop.ciudad}</p>
                        <p className="descripcion">{prop.descripcion}</p>
                        <Link to={`/propiedad/${prop.id}`} className="ver-mas">Ver más detalles</Link>
                    </div>
                </div>
            ))}
        </section>
    );
}
