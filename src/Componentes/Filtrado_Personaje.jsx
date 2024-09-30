import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Filtrado_Personaje() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [termino, setTermino] = useState("");

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const allCharacters = [];
      try {
        const totalPagesResponse = await axios.get("https://dragonball-api.com/api/characters");
        const totalPages = totalPagesResponse.data.meta.totalPages;

        for (let i = 1; i <= totalPages; i++) {
          const response = await axios.get(`https://dragonball-api.com/api/characters?page=${i}`);
          allCharacters.push(...response.data.items);
        }

        setPersonajes(allCharacters); 
      } catch (error) {
        setError("Hubo un problema al cargar los personajes");
      } finally {
        setCargando(false);
      }
    };

    fetchAllCharacters();
  }, []);

  const manejarCambio = (e) => {
    setTermino(e.target.value);
  };

  const personajesFiltrados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(termino.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar personaje..."
        value={termino}
        onChange={manejarCambio}
      />

      {cargando && <p>Cargando personajes...</p>}
      {error && <p>{error}</p>}

      <div className="personajes-grid">
        {personajesFiltrados.map((personaje) => (
          <Link to={`/personajes/${personaje.id}`} key={personaje.id} className="personaje-card">
            <h3 class="titulo_Filtrado">{personaje.name}</h3>
            <img src={personaje.image} alt={personaje.name} />
            <p>{personaje.race}</p>
            <p>{personaje.ki ? `Ki: ${personaje.ki}` : `Ki no encontrado`}</p>
            <p>{personaje.maxKi ? `Máximo de uso en Ki: ${personaje.maxKi}` : `El Máximo Ki no fue encontrado`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Filtrado_Personaje;
