import React from 'react';
import '../Css/SearchBar.css';

export default function Filtros({ filtros, setFiltros, onBuscar }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onBuscar) onBuscar(); // ejecuta callback si se pasa como prop
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="number"
                name="precioMin"
                placeholder="Precio mínimo"
                value={filtros.precioMin}
                onChange={handleChange}
            />
            <input
                type="number"
                name="precioMax"
                placeholder="Precio máximo"
                value={filtros.precioMax}
                onChange={handleChange}
            />
            <input
                type="text"
                name="barrio"
                placeholder="Barrio"
                value={filtros.barrio}
                onChange={handleChange}
            />
            <button type="submit">Buscar</button>
        </form>
    );
}
