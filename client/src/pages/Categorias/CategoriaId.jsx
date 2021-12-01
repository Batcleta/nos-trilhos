import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../helpers/BaseApi";
import { useForm } from "react-hook-form";

function CategoriaId() {
  const { uuid } = useParams();
  const [categoria, setCategoria] = useState({});
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    Api.get(`/categorias/${uuid}`).then((resp) => {
      setCategoria(resp.data);
    });
  }, []);

  const onUpdate = (data) => {
    Api.put(`/categorias/${uuid}`, data).then((resp) => {
      navigate("/categorias");
    });
  };

  return (
    <div>
      {categoria.tipoCategoria ? (
        <form onSubmit={handleSubmit(onUpdate)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            defaultValue={categoria?.nomeCategoria}
            {...register("nomeCategoria", { required: true })}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <select
            defaultValue={categoria?.tipoCategoria}
            {...register("tipoCategoria", { required: true })}
          >
            <option>Escolha uma opção</option>
            <option value="Despesas">Despesas</option>
            <option value="Receitas">Receitas</option>
          </select>

          <select
            defaultValue={categoria?.status === true ? "1" : "0"}
            {...register("status", { required: true })}
          >
            <option value="">Escolha uma opção</option>
            <option value="1">Ativa</option>
            <option value="0">Inativa</option>
          </select>

          {/* errors will return when field validation fails  */}

          <button type="submit">Enviar</button>
        </form>
      ) : (
        "Loading..."
      )}

      <Link to="/categorias">voltar</Link>
    </div>
  );
}

export default CategoriaId;
