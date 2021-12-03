import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../helpers/BaseApi";

function Categorias() {
  const { register, handleSubmit } = useForm();

  const [search, setSearch] = useState();
  const [categorias, setCategorias] = useState([]);

  console.log(categorias);

  useEffect(() => {
    Api.get("categorias", {
      headers: {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJrYmxhY2siLCJpZCI6MSwiYXV0aG9yaXphdGlvbiI6IjEiLCJpYXQiOjE2MzcwMjMzNTV9.KhvkCSxqe8q51SaBLXUeXjNtlHERD2jtnSCmhmAzdjM",
      },
      params: {
        search: search,
      },
    }).then((resp) => setCategorias(resp.data));
  }, [search]);

  const onSubmit = (data) => setSearch(data);

  const onDelete = (uuid, e) => {
    e.preventDefault();
    Api.delete(`/categorias/delete/${uuid}`).then((resp) => {
      const novas = categorias.filter((item) => item.uuid !== uuid);
      setCategorias(novas);
    });
  };

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("nomeCategoria")} />

            <button type="submit">Enviar</button>
          </form>
        </div>
        <Link to="/addCategoria">Nova categoria</Link>
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(6, 1fr)",
            fontWeight: "bold",
          }}
        >
          <div>Nome da categoria</div>
          <div>Tipo da categoria</div>
          <div>Reserva mínima</div>
          <div>Gasto maximo </div>
          <div>Status</div>
        </div>

        {categorias.map((item, key) => (
          <div
            key={key}
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(6, 1fr)",
            }}
          >
            <div>{item.nomeCategoria}</div>
            <div>{item.tipoCategoria}</div>
            <div>{item.reservaMinima ? item.reservaMinima : "---"}</div>
            <div>{item.gastoMaximo ? item.gastoMaximo : "---"}</div>
            <div>{item.status === true ? "Ativa" : "Inativa"}</div>
            <div style={{ gap: "1rem", display: "flex " }}>
              <Link to={`/categoria/${item.uuid}`}>
                <i className="uil uil-edit"></i>
              </Link>
              <a onClick={(e) => onDelete(item.uuid, e)}>
                <i className="uil uil-trash-alt"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
