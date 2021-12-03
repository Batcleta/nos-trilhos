import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../helpers/BaseApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function CategoriaId() {
  const { uuid } = useParams();
  const [categoria, setCategoria] = useState({});
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    Api.get(`/categorias/${uuid}`, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => {
      setCategoria(resp.data);
    });
  }, []);

  const onUpdate = (data) => {
    const formData = {
      ...data,
      status: data.status === "1" ? true : false,
      reservaMinima: data.reservaMinima || null,
      gastoMaximo: data.gastoMaximo || null,
    };

    Api.put(`/categorias/${uuid}`, formData, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => navigate("/categorias"));
  };

  return (
    <div>
      {categoria.tipoCategoria ? (
        <form onSubmit={handleSubmit(onUpdate)}>
          <FormGroup>
            <label htmlFor="">Nome da categoria</label>
            <input
              defaultValue={categoria?.nomeCategoria}
              {...register("nomeCategoria", { required: true })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Tipo da categoria</label>
            <select
              defaultValue={categoria?.tipoCategoria}
              {...register("tipoCategoria", { required: true })}
            >
              <option>Escolha uma opção</option>
              <option value="Despesas">Despesas</option>
              <option value="Receitas">Receitas</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Status</label>
            <select
              defaultValue={categoria?.status === true ? "1" : "0"}
              {...register("status", { required: true })}
            >
              <option value="">Escolha uma opção</option>
              <option value="1">Ativa</option>
              <option value="0">Inativa</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Reserva mínima</label>
            <input
              defaultValue={categoria?.reservaMinima}
              {...register("reservaMinima")}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Maximo para gastos</label>
            <input
              defaultValue={categoria?.gastoMaximo}
              {...register("gastoMaximo")}
            />
          </FormGroup>

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

const FormGroup = styled.div``;
