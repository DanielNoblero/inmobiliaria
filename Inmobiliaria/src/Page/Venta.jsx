import React, { useState } from 'react';
import { propiedades } from '../components/data/propiedades';
import Filtros from '../components/Filtro/Filtros';
import PropiedadesLista from '../components/PropiedadesLista/PropiedadesLista';
import '../components/Css/Destacados.css'; // Importamos los estilos reutilizables

export default function Venta() {
    const [filtros, setFiltros] = useState({ precioMin: '', precioMax: '', barrio: '' });

    const filtradas = propiedades.filter((p) => {
        if (p.tipo !== 'venta') return false;

        const cumpleMin = filtros.precioMin === '' || p.precio >= parseInt(filtros.precioMin);
        const cumpleMax = filtros.precioMax === '' || p.precio <= parseInt(filtros.precioMax);
        const cumpleBarrio =
            filtros.barrio === '' || p.barrio.toLowerCase().includes(filtros.barrio.toLowerCase());

        return cumpleMin && cumpleMax && cumpleBarrio;
    });

    return (
        <div style={{ padding: '2rem', marginTop: '5rem' }}>
            <h2 style={{ color: 'Black', textAlign: 'center' }}>Propiedades en venta</h2>

            <Filtros filtros={filtros} setFiltros={setFiltros} />

            <PropiedadesLista propiedades={filtradas} />
        </div>
    );
}
