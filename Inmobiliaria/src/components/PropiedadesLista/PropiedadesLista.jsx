import { Link } from 'react-router-dom';
import '../Css/Destacados.css';

export default function PropiedadesLista({ propiedades }) {
    return (
        <section className="destacados">
            {propiedades.map((prop) => (
                <div className="card" key={prop.id}>
                    {prop.imagen && <img src={prop.imagen} alt={prop.titulo || 'Propiedad'} />}
                    <div className="info">
                        <p className="precio">USD {prop.precio.toLocaleString()}</p>
                        <p className="ciudad">{prop.barrio}, {prop.ciudad}</p>
                        <p className="descripcion">{prop.descripcion}</p>
                        
                    </div>
                    <Link to={`/propiedad/${prop.id}`} className="ver-mas">Ver más detalles</Link>
                </div>
            ))}
        </section>
    );
}
