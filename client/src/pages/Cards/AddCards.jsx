import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Api from "../../helpers/BaseApi";

function AddCards() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Api.post("/cards", data, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      // .then((resp) => console.log(resp))
      .then(navigate("/cardsList"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="">Apelido do cartão</label>
          <input {...register("cardNickname", { required: true })} />
          {errors.cardNickname && <span>Por favor, informe um Apelido</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">numero do cartão</label>
          <input {...register("cardNumber", { required: true })} />
          {errors.cardNumber && (
            <span>Por favor, informe o numero de seu cartão</span>
          )}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Data de Expiração</label>
          <input {...register("expireDate", { required: true })} />
          {errors.expireDate && (
            <span>Por favor, informe o numero de seu cartão</span>
          )}
        </FormGroup>

        <button type="submit">Salvar</button>
      </form>

      <Link to="/cardsList">voltar</Link>
    </div>
  );
}

export default AddCards;

const FormGroup = styled.div``;
