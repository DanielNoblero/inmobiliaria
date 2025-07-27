import React from 'react';
import { useLocation } from 'react-router-dom';
import { propiedades } from '../data/propiedades'; 
import PropiedadesLista from '../PropiedadesLista/PropiedadesLista'; 

export default function Resultados() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const tipo = params.get('tipo');
  const ciudad = params.get('ciudad');
  const query = params.get('query')?.toLowerCase() || '';

  // 🔍 Filtrado de propiedades
  const propiedadesFiltradas = propiedades.filter((p) => {
    const coincideTipo = !tipo || p.tipo === tipo;
    const coincideCiudad = !ciudad || p.ciudad === ciudad;
    const coincideQuery =
      !query || p.descripcion.toLowerCase().includes(query) || p.barrio.toLowerCase().includes(query);

    return coincideTipo && coincideCiudad && coincideQuery;
  });

  return (
    <div style={{ marginTop: '10rem', padding: '2rem', color: 'black', textAlign: 'center',}}>
      <h2>Resultados de búsqueda</h2>
      <p><strong>Tipo:</strong> {tipo || 'Todos'}</p>
      <p><strong>Ciudad:</strong> {ciudad || 'Todas'}</p>
      <p><strong>Búsqueda:</strong> {query || 'Sin palabra clave'}</p>

      {propiedadesFiltradas.length > 0 ? (
        <PropiedadesLista propiedades={propiedadesFiltradas} />
      ) : (
        <p style={{ marginTop: '10rem', fontWeight: 'bold' }}>⚠️ No hay propiedades que coincidan con la búsqueda.</p>
      )}
    </div>
  );
}
