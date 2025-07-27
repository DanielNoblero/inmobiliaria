import apt1 from '../Multimedia/apartamento1.jpeg';
import apt1b from '../Multimedia/apartamento1.jpeg';
import apt2 from '../Multimedia/apartamento2.jpeg';
import apt2b from '../Multimedia/apartamento2.jpeg';

export const propiedades = [
    {
        id: 1,
        tipo: 'venta',
        ciudad: 'Montevideo',
        barrio: 'Pocitos',
        precio: 120000,
        titulo: 'Apto en Pocitos',
        descripcion: 'Excelente estado, a metros de la rambla.',
        imagen: apt1,
        imagenes: [apt1, apt1b],
        superficie: 75,
        dormitorios: 2,
        baños: 1,
    },
    {
        id: 2,
        tipo: 'alquiler',
        ciudad: 'Canelones',
        barrio: 'Centro',
        precio: 85000,
        titulo: 'Apartamento familiar',
        descripcion: '3 dormitorios, patio grande.',
        imagen: apt2,
        imagenes: [apt2, apt2b],
        superficie: 90,
        dormitorios: 3,
        baños: 2,
    },
    {
        id: 3,
        tipo: 'venta',
        ciudad: 'Montevideo',
        barrio: 'Pocitos',
        precio: 120000,
        titulo: 'Apto en Pocitos',
        descripcion: 'Excelente estado, a metros de la rambla.',
        imagen: apt1,
        imagenes: [apt1, apt1b],
    },
    {
        id: 4,
        tipo: 'alquiler',
        ciudad: 'Canelones',
        barrio: 'Centro',
        precio: 85000,
        titulo: 'Apartamento familiar',
        descripcion: '3 dormitorios, patio grande.',
        imagen: apt2,
        imagenes: [apt2, apt2b],
    },
];
