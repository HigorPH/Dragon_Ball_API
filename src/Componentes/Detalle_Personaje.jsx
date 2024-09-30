import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetallePersonaje() {
    const { id } = useParams();
    const [personaje, setPersonaje] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://dragonball-api.com/api/characters/${id}`)
            .then((response) => {
                setPersonaje(response.data); // Asegúrate de que la ruta sea correcta
                setCargando(false);
            })
            .catch((error) => {
                setError('Hubo un problema al cargar el personaje');
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <p>CARGANDO....</p>;
    if (error) return <p>{error}</p>;
    if (!personaje) return <p>No se encontró el personaje.</p>;

    return (
        <div className="detalle-container">
            <div className="personaje-cardd">
                <h2>{personaje.name}</h2>
                <img src={personaje.image} alt={personaje.name} />
                <p>Ki: {personaje.ki}</p>
                <p>Max Ki: {personaje.maxKi}</p>
                <p>Raza: {personaje.race}</p>
                <p>Género: {personaje.gender}</p>
                <p>Descripción: {personaje.description}</p>
                <p>Planeta de origen: {personaje.originPlanet.name}</p>
                <p>Destruido: {personaje.originPlanet.isDestroyed ? "Sí" : "No"}</p>
                <p class="description">Descripción del planeta: {personaje.originPlanet.description}</p>
                <img src={personaje.originPlanet.image}/>
            </div>
    
            <h3  class="transformaciones">Transformaciones:</h3>
            <div className="transformaciones-grid">
                {personaje.transformations.map(transformation => (
                    <div className="transformacion-card" key={transformation.id}>
                        <p>{transformation.name}</p>
                        <img src={transformation.image} alt={transformation.name} />
                        <p>Ki: {transformation.ki}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default DetallePersonaje;
