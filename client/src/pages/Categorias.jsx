import React from "react";
import { Link } from "react-router-dom";

function Categorias() {
  return (
    <div>
      <div>
        <div>Barra de pesquisa</div>
        <Link to="/addCategoria">Nova categoria</Link>
      </div>
      <div>Lista de categorias</div>
    </div>
  );
}

export default Categorias;
