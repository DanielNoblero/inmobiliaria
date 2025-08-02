import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PropiedadesLista from '../PropiedadesLista/PropiedadesLista';

export default function Resultados() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const tipo = params.get('tipo');
  const ciudad = params.get('ciudad');
  const query = params.get('query')?.toLowerCase() || '';

  const [propiedades, setPropiedades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPropiedades = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'propiedades'));
        const datos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPropiedades(datos);
      } catch (error) {
        console.error('Error al cargar propiedades:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPropiedades();
  }, []);

  const propiedadesFiltradas = propiedades.filter((p) => {
    const coincideTipo = !tipo || p.tipo === tipo;
    const coincideCiudad = !ciudad || p.ciudad === ciudad;
    const coincideQuery =
      !query || p.descripcion?.toLowerCase().includes(query) || p.barrio?.toLowerCase().includes(query);

    return coincideTipo && coincideCiudad && coincideQuery;
  });

  return (
    <div style={{ marginTop: '10rem', padding: '2rem', color: 'black', textAlign: 'center' }}>
      <h2>Resultados de búsqueda</h2>
      <p><strong>Tipo:</strong> {tipo || 'Todos'}</p>
      <p><strong>Ciudad:</strong> {ciudad || 'Todas'}</p>
      <p><strong>Búsqueda:</strong> {query || 'Sin palabra clave'}</p>

      {cargando ? (
        <p>Cargando propiedades...</p>
      ) : propiedadesFiltradas.length > 0 ? (
        <PropiedadesLista propiedades={propiedadesFiltradas} />
      ) : (
        <p style={{ marginTop: '10rem', fontWeight: 'bold' }}>
          ⚠️ No hay propiedades que coincidan con la búsqueda.
        </p>
      )}
    </div>
  );
}
