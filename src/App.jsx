import React from "react";
import Personajes from "./Componentes/Personajes";
import Detalle_Personaje from "./Componentes/Detalle_Personaje";
import Filtrado_Personaje from "./Componentes/Filtrado_Personaje";
import Login from "./Componentes/Login"; 
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Dragon Ball API</h1>
        <nav>
          <Link to="/personajes">
            <button>Ver Personajes</button>
          </Link>
          <Link to="/buscar">
            <button>Buscar Personajes</button>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personajes" element={<Personajes />} />
          <Route path="personajes/:id" element={<Detalle_Personaje />} />
          <Route path="/buscar" element={<Filtrado_Personaje/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
