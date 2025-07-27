import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../Css/SearchBar.css';

const opcionesCiudad = [
  { value: '', label: 'Ciudad' },
  { value: 'Montevideo', label: 'Montevideo' },
  { value: 'Punta del Este', label: 'Punta del Este' },
  { value: 'Canelones', label: 'Canelones' },
  { value: 'Colonia', label: 'Colonia' },
];

const opcionesTipo = [
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'venta', label: 'Venta' },
];

export default function SearchBar() {
  const [tipo, setTipo] = useState('alquiler');
  const [ciudad, setCiudad] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      tipo,
      ciudad,
      query,
    });
    navigate(`/resultados?${params.toString()}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar propiedad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Select
        options={opcionesTipo}
        value={opcionesTipo.find((t) => t.value === tipo)}
        onChange={(selected) => setTipo(selected ? selected.value : 'alquiler')}
        placeholder="Tipo"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: 12,
            padding: '0.25rem',
            borderColor: '#ccc',
          }),
          option: (base, state) => ({
            ...base,
            borderRadius: 8,
            margin: '0.2rem 0',
            backgroundColor: state.isFocused ? '#2b7cff' : 'white',
            color: state.isFocused ? 'white' : 'black',
            cursor: 'pointer',
          }),
        }}
      />

      <Select
        options={opcionesCiudad}
        value={opcionesCiudad.find((c) => c.value === ciudad)}
        onChange={(selected) => setCiudad(selected ? selected.value : '')}
        placeholder="Ciudad"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: 12,
            padding: '0.25rem',
            borderColor: '#ccc',
          }),
          option: (base, state) => ({
            ...base,
            borderRadius: 8,
            margin: '0.2rem 0',
            backgroundColor: state.isFocused ? '#2b7cff' : 'white',
            color: state.isFocused ? 'white' : 'black',
            cursor: 'pointer',
          }),
        }}
      />

      <button type="submit">Buscar</button>
    </form>
  );
}
