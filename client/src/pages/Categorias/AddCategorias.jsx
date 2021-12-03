import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Api from "../../helpers/BaseApi";

function AddCategorias() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      status: data.status === "1" ? true : false,
      reservaMinima: data.reservaMinima || null,
      gastoMaximo: data.gastoMaximo || null,
    };
    Api.post("/categorias", formData, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      .then((resp) => console.log(resp))
      .then(navigate("/categorias"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="">Nome da categoria</label>
          <input {...register("nomeCategoria", { required: true })} />
          {errors.nomeCategoria && <span>Informe o nome da categoria</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Tipo da categoria</label>
          <select {...register("tipoCategoria", { required: true })}>
            <option value="">Escolha uma opção</option>
            <option value="Despesas">Despesas</option>
            <option value="Receitas">Receitas</option>
          </select>
          {errors.tipoCategoria && <span>Informe o tipo da categoria</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Status inicial</label>
          <select {...register("status", { required: true })}>
            <option value="">Escolha uma opção</option>
            <option value="1">Ativa</option>
            <option value="0">Inativa</option>
          </select>
          {errors.status && <span>Categoria ativa ou inativa? </span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Reserva mínima</label>
          <input {...register("reservaMinima")} />
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Maximo para gastos</label>
          <input {...register("gastoMaximo")} />
        </FormGroup>

        <button type="submit">Enviar</button>
      </form>

      <Link to="/categorias">voltar</Link>
    </div>
  );
}

export default AddCategorias;

const FormGroup = styled.div``;
