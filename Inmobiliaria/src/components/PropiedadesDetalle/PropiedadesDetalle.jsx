import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Css/PropiedadesDetalle.css';

export default function PropiedadDetalle() {
    const { id } = useParams();
    const [propiedad, setPropiedad] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchPropiedad = async () => {
            try {
                const docRef = doc(db, 'propiedades', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPropiedad({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setPropiedad(null);
                }
            } catch (error) {
                console.error('Error al obtener la propiedad:', error);
            } finally {
                setCargando(false);
            }
        };

        fetchPropiedad();
    }, [id]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    if (cargando) return <p style={{ color: 'white', textAlign: 'center' }}>Cargando propiedad...</p>;

    if (!propiedad) {
        return <p style={{ color: 'white', textAlign: 'center' }}>Propiedad no encontrada.</p>;
    }

    return (
        <div className="propiedad-detalle">
            <h2>{propiedad.titulo}</h2>

            <div className="slider-container">
                <Slider {...sliderSettings}>
                    {propiedad.imagenes?.map((img, i) => (
                        <div key={i}>
                            <img src={img} alt={`Foto ${i + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="propiedad-info">
                <p><strong>Ubicación:</strong> {propiedad.barrio || 'Barrio no especificado'}, {propiedad.ciudad}</p>
                <p><strong>Precio:</strong> USD {Number(propiedad.precio).toLocaleString()}</p>
                <p><strong>Superficie:</strong> {propiedad.superficie || '-'} m²</p>
                <p><strong>Dormitorios:</strong> {propiedad.dormitorios || '-'}</p>
                <p><strong>Baños:</strong> {propiedad.baños || '-'}</p>
                <p><strong>Descripción:</strong> {propiedad.descripcion}</p>
            </div>
        </div>
    );
}
