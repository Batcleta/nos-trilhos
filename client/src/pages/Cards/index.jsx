import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../helpers/BaseApi";
import convertDate from "../../componentes/funcionals/convertDate";

function CardsList() {
  const [cards, setCards] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Api.get("/cards", {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => {
      setCards(resp.data);
    });
  }, []);

  const onDelete = () => {};

  return (
    <div>
      <div>
        <Link to="/addCard">Adicionar cartão</Link>
      </div>
      <hr />
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(5, 1fr)",
          fontWeight: "bold",
        }}
      >
        <div>Apelido do cartão</div>
        <div>Cartão</div>
        <div>Vencimento do cartão</div>
        <div>Status do cartão</div>
      </div>
      <div>
        {cards?.map((item, key) => (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
            key={key}
          >
            <div>{item.cardNickname}</div>
            <div>{`*** ${item.cardNumber.slice(-4)}`}</div>
            <div>{convertDate(item.expireDate)}</div>
            <div>{item.statusDoCartão ? "Ativo" : "Inativo"}</div>
            <div style={{ gap: "1rem", display: "flex " }}>
              <Link to={`/cardId/${item.uuid}`}>
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

export default CardsList;
