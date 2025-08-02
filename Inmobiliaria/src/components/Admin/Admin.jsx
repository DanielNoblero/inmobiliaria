import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/AuthContext';
import '../Css/admin.css';

const Admin = () => {
    const { signOut } = useAuth();

    // Estados
    const [formData, setFormData] = useState({
        titulo: '',
        ciudad: '',
        precio: '',
        descripcion: '',
        destacado: false,
        tipo: 'venta',
        superficie: '',   // NUEVO
        dormitorios: '',  // NUEVO
        baños: '',        // NUEVO
    });

    // URLs de imágenes actuales (en edición)
    const [imagenesUrls, setImagenesUrls] = useState([]);
    // Nuevos archivos para subir
    const [imagenesNuevas, setImagenesNuevas] = useState([]);
    const [subiendo, setSubiendo] = useState(false);
    const [propiedades, setPropiedades] = useState([]);
    const [cargandoPropiedades, setCargandoPropiedades] = useState(true);
    const [editandoId, setEditandoId] = useState(null);

    // Cargar propiedades de Firestore
    useEffect(() => {
        const fetchPropiedades = async () => {
            setCargandoPropiedades(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'propiedades'));
                const props = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPropiedades(props);
            } catch (error) {
                console.error('Error cargando propiedades:', error);
            }
            setCargandoPropiedades(false);
        };
        fetchPropiedades();
    }, []);

    // Manejo cambios formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Manejo selección imágenes nuevas
    const handleFileChange = (e) => {
        setImagenesNuevas(prev => [...prev, ...Array.from(e.target.files)]);
    };

    // Eliminar imagen individual en edición (URL)
    const eliminarImagenUrl = async (url) => {
        if (!window.confirm('¿Querés eliminar esta imagen?')) return;

        try {
            const imgRef = ref(storage, url);
            await deleteObject(imgRef);
            setImagenesUrls(prev => prev.filter(u => u !== url));
        } catch (error) {
            console.error('Error eliminando imagen:', error);
            alert('No se pudo eliminar la imagen.');
        }
    };

    // Eliminar imagen nueva (antes de subir)
    const eliminarImagenNueva = (index) => {
        setImagenesNuevas(prev => prev.filter((_, i) => i !== index));
    };

    // Cargar propiedad para editar
    const cargarParaEditar = (prop) => {
        setFormData({
            titulo: prop.titulo,
            ciudad: prop.ciudad,
            precio: prop.precio,
            descripcion: prop.descripcion,
            destacado: prop.destacado || false,
            tipo: prop.tipo || 'venta',
            superficie: prop.superficie || '',
            dormitorios: prop.dormitorios || '',
            baños: prop.baños || '',
        });
        setImagenesUrls(prop.imagenes || []);
        setImagenesNuevas([]);
        setEditandoId(prop.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Cancelar edición
    const cancelarEdicion = () => {
        setFormData({
            titulo: '',
            ciudad: '',
            precio: '',
            descripcion: '',
            destacado: false,
            tipo: 'venta',
            superficie: '',
            dormitorios: '',
            baños: '',
        });
        setImagenesUrls([]);
        setImagenesNuevas([]);
        setEditandoId(null);
    };

    // Validar formulario
    const validarFormulario = () => {
        if (!formData.titulo.trim()) {
            alert('El título es obligatorio');
            return false;
        }
        if (!formData.ciudad.trim()) {
            alert('La ciudad es obligatoria');
            return false;
        }
        if (!formData.precio || isNaN(formData.precio) || Number(formData.precio) <= 0) {
            alert('Ingrese un precio válido');
            return false;
        }
        if (!['venta', 'alquiler'].includes(formData.tipo)) {
            alert('Debe seleccionar tipo Venta o Alquiler');
            return false;
        }
        if (!formData.descripcion.trim()) {
            alert('La descripción es obligatoria');
            return false;
        }
        if (imagenesUrls.length + imagenesNuevas.length === 0) {
            alert('Debe agregar al menos una imagen');
            return false;
        }
        return true;
    };

    // Guardar o actualizar propiedad
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setSubiendo(true);

        try {
            const urlsSubidas = [];
            for (const imagen of imagenesNuevas) {
                const imageRef = ref(storage, `propiedades/${uuidv4()}-${imagen.name}`);
                await uploadBytes(imageRef, imagen);
                const url = await getDownloadURL(imageRef);
                urlsSubidas.push(url);
            }

            const todasUrls = [...imagenesUrls, ...urlsSubidas];

            const datosGuardar = {
                ...formData,
                precio: Number(formData.precio),
                superficie: Number(formData.superficie) || null,
                dormitorios: Number(formData.dormitorios) || null,
                baños: Number(formData.baños) || null,
                imagenes: todasUrls,
            };

            if (editandoId) {
                const propRef = doc(db, 'propiedades', editandoId);
                await updateDoc(propRef, {
                    ...datosGuardar,
                    actualizado: new Date()
                });

                setPropiedades(prev =>
                    prev.map(p => p.id === editandoId ? { id: editandoId, ...datosGuardar } : p)
                );

                alert('Propiedad actualizada correctamente');
                cancelarEdicion();
            } else {
                const docRef = await addDoc(collection(db, 'propiedades'), {
                    ...datosGuardar,
                    creado: new Date()
                });

                setPropiedades(prev => [...prev, { id: docRef.id, ...datosGuardar, creado: new Date() }]);
                alert('Propiedad guardada correctamente');
                cancelarEdicion();
            }
        } catch (error) {
            console.error('Error guardando propiedad:', error);
            alert('Error al guardar la propiedad');
        } finally {
            setSubiendo(false);
        }
    };

    // Eliminar propiedad completa
    const eliminarPropiedad = async (id, imagenes) => {
        if (!window.confirm('¿Querés eliminar esta propiedad? Esta acción no se puede deshacer.')) return;

        try {
            for (const url of imagenes) {
                try {
                    const imgRef = ref(storage, url);
                    await deleteObject(imgRef);
                } catch (e) {
                    console.warn('No se pudo eliminar una imagen:', e);
                }
            }

            await deleteDoc(doc(db, 'propiedades', id));
            setPropiedades(prev => prev.filter(p => p.id !== id));
            if (editandoId === id) cancelarEdicion();
            alert('Propiedad eliminada');
        } catch (error) {
            console.error('Error eliminando propiedad:', error);
            alert('Error al eliminar propiedad');
        }
    };

    return (
        <div className="admin-container">
            <h2>{editandoId ? 'Editar propiedad' : 'Agregar nueva propiedad'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    min="0"
                />

                

                {/* Nuevos campos */}
                <input
                    type="number"
                    name="superficie"
                    placeholder="Superficie (m²)"
                    value={formData.superficie}
                    onChange={handleChange}
                    min="0"
                    step="any"
                />
                <input
                    type="number"
                    name="dormitorios"
                    placeholder="Dormitorios"
                    value={formData.dormitorios}
                    onChange={handleChange}
                    min="0"
                />
                <input
                    type="number"
                    name="baños"
                    placeholder="Baños"
                    value={formData.baños}
                    onChange={handleChange}
                    min="0"
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    rows={4}
                />

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="destacado"
                        checked={formData.destacado}
                        onChange={handleChange}
                    />
                    Marcar como destacado
                </label>
                <div className="form-group-tipo" style={{ marginBottom: '1rem' }}>
                    <label>
                        <input
                            type="radio"
                            name="tipo"
                            value="venta"
                            checked={formData.tipo === 'venta'}
                            onChange={handleChange}
                        />
                        Venta
                    </label>
                    <label style={{ marginLeft: '1rem' }}>
                        <input
                            type="radio"
                            name="tipo"
                            value="alquiler"
                            checked={formData.tipo === 'alquiler'}
                            onChange={handleChange}
                        />
                        Alquiler
                    </label>
                </div>

                <div className="imagenes-preview-container">
                    <p><strong>Imágenes actuales:</strong></p>
                    {imagenesUrls.length === 0 && <p>No hay imágenes.</p>}
                    <div className="imagenes-preview">
                        {imagenesUrls.map((url, i) => (
                            <div key={i} className="imagen-preview">
                                <img src={url} alt={`Imagen ${i + 1}`} />
                                <button
                                    type="button"
                                    className="btn-eliminar-img"
                                    title="Eliminar imagen"
                                    onClick={() => eliminarImagenUrl(url)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="imagenes-preview-container">
                    <p><strong>Imágenes nuevas:</strong></p>
                    {imagenesNuevas.length === 0 && <p>No hay imágenes nuevas seleccionadas.</p>}
                    <div className="imagenes-preview">
                        {imagenesNuevas.map((file, i) => (
                            <div key={i} className="imagen-preview">
                                <img src={URL.createObjectURL(file)} alt={file.name} />
                                <button
                                    type="button"
                                    className="btn-eliminar-img"
                                    title="Eliminar imagen nueva"
                                    onClick={() => eliminarImagenNueva(i)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                />

                <button type="submit" disabled={subiendo} className="btn-guardar">
                    {subiendo ? (editandoId ? 'Actualizando...' : 'Subiendo...') : (editandoId ? 'Actualizar propiedad' : 'Guardar propiedad')}
                </button>

                {editandoId && (
                    <button type="button" onClick={cancelarEdicion} className="btn-cancelar">
                        Cancelar edición
                    </button>
                )}
            </form>

            <hr style={{ margin: '3rem 0', borderColor: '#444' }} />

            <h2>Propiedades existentes</h2>
            {cargandoPropiedades ? (
                <p>Cargando propiedades...</p>
            ) : propiedades.length === 0 ? (
                <p>No hay propiedades guardadas.</p>
            ) : (
                <ul className="lista-propiedades">
                    {propiedades.map(p => (
                        <li key={p.id} className="item-propiedad">
                            <div>
                                <strong>{p.titulo}</strong> — {p.ciudad} — USD {p.precio.toLocaleString()} — <em>{p.tipo}</em>
                                {p.destacado && <span className="destacado-star">★ Destacado</span>}
                            </div>
                            <div className="botones-acciones">
                                <button
                                    onClick={() => cargarParaEditar(p)}
                                    className="btn-editar"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarPropiedad(p.id, p.imagenes || [])}
                                    className="btn-eliminar"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button onClick={signOut} className="btn-logout">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Admin;
