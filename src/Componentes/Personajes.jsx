import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Personajes() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    setCargando(true);
    axios
      .get(`https://dragonball-api.com/api/characters?page=${pagina}&limit=10`)
      .then((response) => {
        setPersonajes(response.data.items);
        setTotalPaginas(Math.ceil(response.data.total / 10)); 
        setCargando(false);
      })
      .catch(() => {
        setError("Hay problemas al cargar personajes");
        setCargando(false);
      });
  }, [pagina]);

  const handleSearch = (e) => { setSearchTerm(e.target.value); 
  };


  const filteredPersonajes = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(searchTerm.toLowerCase()));


  if (cargando) return <p>Cargando personajes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Personajes de Dragon Ball</h2>
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="personajes-grid">
      
        {filteredPersonajes.length > 0 ? (
          filteredPersonajes.map((personaje) => (
            <Link to={`/personajes/${personaje.id}`} key={personaje.id} className="personaje-card">
              <h3>{personaje.name}</h3>
              <img src={personaje.image} alt={personaje.name} />
              <p>{personaje.race ? `Raza: ${personaje.race}` : `Raza no encontrada`}</p>
              <p>{personaje.ki ? `Ki: ${personaje.ki}` : `Ki no encontrado`}</p>
              <p>{personaje.maxKi ? `Máximo de uso en Ki: ${personaje.maxKi}` : `El Máximo Ki no fue encontrado`}</p>
            </Link>
          ))
        ) : (
          <p>No se encontraron personajes con ese nombre en está pagina, prueba en otra.</p>
        )}
      </div>

    
      <div className="pagination">
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          Anterior
        </button>
        <span className="pagina">{`Página ${pagina} `}</span>
        <button
          onClick={() => setPagina(pagina + 1)}
          disabled={pagina === totalPaginas || personajes.length < 10}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Personajes;
