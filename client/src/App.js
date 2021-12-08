import React, { useEffect } from "react";
import { Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// Pages
import LoginPage from "./pages/Login";
import NovoUsuário from "./pages/NovoUsuário";

import Categorias from "./pages/Categorias";
import AddCategorias from "./pages/Categorias/AddCategorias";
import CategoriaId from "./pages/Categorias/CategoriaId";

import Contratos from "./pages/Contratos";
import AddContrato from "./pages/Contratos/AddContrato";
import ContratoId from "./pages/Contratos/ContratoId";

import CardsList from "./pages/Cards";
import AddCards from "./pages/Cards/AddCards";
import CardId from "./pages/Cards/CardId";

import ComprasList from "./pages/Compras";
import AddCompras from "./pages/Compras/AddCompras";
import ComprasId from "./pages/Compras/ComprasId";

// helpers
import Api from "./helpers/BaseApi";
import { useAuth } from "./helpers/MainContext";

function App() {
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      Api.get("/users/auth", {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => {
        if (resp.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
          navigate("/");
        } else {
          setAuthState({
            username: resp.data.username,
            id: resp.data.id,
            authorization: resp.data.authorization,
            status: true,
          });
          // navigate("/dashboard");
        }
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/novoUsuario">Novo Usuário</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/categorias">Categorias</Link>
          </li>
          <li>
            <Link to="/contratos">Contratos</Link>
          </li>
          <li>
            <Link to="/cardsList">Meus Cartões</Link>
          </li>
          <li>
            <Link to="/comprasList">Minhas Compras</Link>
          </li>
          <li>
            <p
              onClick={() => {
                localStorage.removeItem("apiKey");
                setAuthState({
                  username: "",
                  id: 0,
                  authorization: "",
                  status: false,
                });
                navigate("/");
              }}
            >
              Logout
            </p>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/novoUsuario" element={<NovoUsuário />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Contratos */}
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/contrato/:uuid" element={<ContratoId />} />
        <Route path="/addContrato" element={<AddContrato />} />

        {/* categorias */}
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categoria/:uuid" element={<CategoriaId />} />
        <Route path="/addCategoria" element={<AddCategorias />} />

        {/* Cartões */}
        <Route path="/cardsList" element={<CardsList />} />
        <Route path="/addCard" element={<AddCards />} />
        <Route path="/cardId/:uuid" element={<CardId />} />

        {/* Compras */}
        <Route path="/comprasList" element={<ComprasList />} />
        <Route path="/addCompra" element={<AddCompras />} />
        <Route path="/CompraId/:uuid" element={<ComprasId />} />
      </Routes>
    </div>
  );
}

export default App;
