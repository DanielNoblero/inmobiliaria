import { Link } from 'react-router-dom';
import '../Css/Destacados.css';

export default function PropiedadesLista({ propiedades }) {
    return (
        <section className="destacados">
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
