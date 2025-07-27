import React from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { propiedades } from '../data/propiedades';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Css/PropiedadesDetalle.css'; // Importa tus estilos personalizados

export default function PropiedadDetalle() {
    const { id } = useParams();
    const propiedad = propiedades.find((p) => p.id === parseInt(id));

    if (!propiedad) {
        return <p style={{ color: 'white', textAlign: 'center' }}>Propiedad no encontrada.</p>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="propiedad-detalle">
            <h2>{propiedad.titulo}</h2>
<div className="slider-container">
                <Slider {...sliderSettings}>
                    {propiedad.imagenes.map((img, i) => (
                        <div key={i}>
                            <img src={img} alt={`Foto ${i + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="propiedad-info">
                <p><strong>Ubicación:</strong> {propiedad.barrio}, {propiedad.ciudad}</p>
                <p><strong>Precio:</strong> USD {propiedad.precio.toLocaleString()}</p>
                <p><strong>Superficie:</strong> {propiedad.superficie} m²</p>
                <p><strong>Dormitorios:</strong> {propiedad.dormitorios}</p>
                <p><strong>Baños:</strong> {propiedad.baños}</p>
                <p><strong>Descripción:</strong> {propiedad.descripcion}</p>
            </div>

            
        </div>
    );
}
