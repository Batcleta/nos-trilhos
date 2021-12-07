import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../helpers/BaseApi";
import convertDate from "../../componentes/funcionals/convertDate";
import convertMoney from "../../componentes/funcionals/convertMoney";

function Contratos() {
  const { register, handleSubmit } = useForm();
  const [contratos, setContratos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Api.get("/contratos", {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => setContratos(resp.data));
  }, []);

  const onSubmit = () => {};

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("nomeCategoria")} />

            <button type="submit">Enviar</button>
          </form>
        </div>
        <Link to="/addContrato">Novo contrato</Link>
      </div>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(7, 1fr)",
          fontWeight: "bold",
        }}
      >
        <div>Descrição </div>
        <div>Valor</div>
        <div>Categoria</div>
        <div>Status</div>
        <div>Inicio do contrato</div>
        <div>fidelidade</div>
      </div>

      {contratos?.map((item, key) => (
        <div
          key={key}
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          <div>{item.descricaoDoContrato}</div>
          <div>{convertMoney(item.valorDoContrato)}</div>
          <div>{item.categoria.map((item) => item.nomeCategoria)}</div>
          <div>{item.statusDoContrato}</div>
          <div>{convertDate(item.inicioDoContrato)}</div>
          <div>{`${item.mesesDeFidelidade} meses`}</div>
          <div>
            <Link to={`/contrato/${item.uuid}`}>mais detalhes...</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contratos;
