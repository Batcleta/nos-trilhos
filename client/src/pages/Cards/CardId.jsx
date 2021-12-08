import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../helpers/BaseApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import convertDate from "../../componentes/funcionals/convertDate";

function CardId() {
  const [card, setCard] = useState();
  const { uuid } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    Api.get(`/cards/${uuid}`, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => {
      setCard(resp.data);
    });
  }, []);

  const onUpdate = (data) => {
    const { createdAt, updatedAt, ...rest } = card;

    const status = data.statusDoCartão === "Ativo" ? true : false;

    if (
      rest.cardNickname !== data.cardNickname ||
      rest.statusDoCartão !== status
    ) {
      const formData = {
        ...rest,
        cardNickname: data.cardNickname,
        statusDoCartão: status,
      };

      Api.put(`/cards/update/${uuid}`, formData, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => {
        if (resp.data[0] == 1) {
          alert("Atualizado com sucesso");
        } else {
          console.log("foi nao cabra");
        }
      });
    }

    navigate("/cardsList");
  };

  return (
    <div>
      {card?.uuid ? (
        <form onSubmit={handleSubmit(onUpdate)}>
          <FormGroup>
            <label htmlFor="">Apelido</label>
            <input
              defaultValue={card?.cardNickname}
              {...register("cardNickname", { required: true })}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Numero do cartão</label>
            <input disabled defaultValue={card?.cardNumber.slice(-4)} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Validade</label>
            <input disabled defaultValue={convertDate(card?.expireDate)} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Status</label>
            <select
              defaultValue={card?.statusDoCartão ? "Ativo" : "Inativo"}
              {...register("statusDoCartão", { required: true })}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </FormGroup>

          <button type="submit">Enviar</button>
        </form>
      ) : (
        "loading..."
      )}

      <Link to="/cardsList">voltar</Link>
    </div>
  );
}

export default CardId;

const FormGroup = styled.div``;
