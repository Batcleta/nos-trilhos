import { Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddCategorias from "./pages/AddCategorias";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/categorias">Nova categoria</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/addCategoria" element={<AddCategorias />} />
      </Routes>
    </div>
  );
}

export default App;
