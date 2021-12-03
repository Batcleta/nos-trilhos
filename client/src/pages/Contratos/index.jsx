import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../helpers/BaseApi";

function Contratos() {
  const { register, handleSubmit } = useForm();

  const [contratos, setContratos] = useState([]);
  console.log(contratos);

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
      {" "}
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("nomeCategoria")} />

            <button type="submit">Enviar</button>
          </form>
        </div>
        <Link to="/addContrato">Novo contrato</Link>
      </div>
    </div>
  );
}

export default Contratos;
