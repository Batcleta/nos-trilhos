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
    const newData = {
      ...data,
      expireDate: new Date(`01/${data.expireDate}`),
      statusDoCartão: true,
    };
    Api.post("/cards", newData, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      // .then((resp) => console.log(resp))
      .then((resp) => {
        if (resp.data) {
          navigate("/cardsList");
        } else {
          console.log("deu um erro aqui no cadastro");
        }
      });
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
          <label htmlFor="">Tipo do cartão</label>
          <select {...register("tipoCartao", { required: true })}>
            <option value="">Escolha</option>
            <option value="1">Débito</option>
            <option value="2">Crédito</option>
            <option value="3">Débito e crédito</option>
          </select>
          {errors.tipoCartao && <span>Informe um método de pagamento</span>}
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

        <FormGroup>
          <label htmlFor="">Dia do fechamento da fatura</label>
          <input {...register("fechamentoFatura", { required: true })} />
          {errors.fechamentoFatura && (
            <span>Por favor, informe a dia de fechamento da sua fatura</span>
          )}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Dia do vencimento da fatura</label>
          <input {...register("vencimentoFatura", { required: true })} />
          {errors.vencimentoFatura && (
            <span>Por favor, informe a dia de vencimento da sua fatura</span>
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
