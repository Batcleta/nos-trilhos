import { Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// Pages
import AddCategorias from "./pages/Categorias/AddCategorias";
import Categorias from "./pages/Categorias";
import CategoriaId from "./pages/Categorias/CategoriaId";
import Contratos from "./pages/Contratos";
import AddContrato from "./pages/Contratos/AddContrato";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/categorias">Categorias</Link>
          </li>
          <li>
            <Link to="/contratos">Contratos</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />

        {/* Contratos */}
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/addContrato" element={<AddContrato />} />

        {/* categorias */}
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categoria/:uuid" element={<CategoriaId />} />
        <Route path="/addCategoria" element={<AddCategorias />} />
      </Routes>
    </div>
  );
}

export default App;
