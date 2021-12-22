import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../helpers/BaseApi";
import convertDate from "../../componentes/funcionals/convertDate";
import convertMoney from "../../componentes/funcionals/convertMoney";

function ComprasList() {
  const { register, handleSubmit } = useForm();
  const [search, setSearch] = useState();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    Api.get("compras", {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
      params: {
        search: search,
      },
    }).then((resp) => setCompras(resp.data));
  }, [search]);

  const onSubmit = (data) => setSearch(data);

  const onDelete = (uuid, e) => {
    e.preventDefault();
    Api.delete(`/compras/delete/${uuid}`, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => {
      const novas = compras.filter((item) => item.uuid !== uuid);
      setCompras(novas);
    });
  };

  if (!compras) return "loading...";

  return (
    <div>
      <h3>Minhas compras</h3>
      <h5>
        Total das compras:{" "}
        {compras
          ? convertMoney(
              compras?.reduce(
                (acc, { totalDaCompra }) => acc + totalDaCompra,
                0
              )
            )
          : "carregando..."}
      </h5>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("nomeCategoria")} />

            <button type="submit">Enviar</button>
          </form>
        </div>
        <Link to="/addCompra">Nova Compra</Link>
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(9, 1fr)",
            fontWeight: "bold",
          }}
        >
          <div>Data</div>
          <div>Descrição</div>
          <div>Valor</div>
          <div>Tipo</div>
          <div>Pagamento</div>
          <div>nº do (condicional)</div>
          <div>Parcelas</div>
          <div>Status</div>
        </div>

        {compras
          ?.filter((item) => (item.status = true))
          .map((item, key) => (
            <div
              key={key}
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: `repeat(${9}, 1fr)`,
              }}
            >
              <div>{convertDate(item.dataDaCompra)}</div>
              <div>{item.descricaoDaCompra}</div>
              <div>{convertMoney(item.totalDaCompra)}</div>
              <div>{item.tipoDePagamento}</div>
              <div>{item.formaDePagamento}</div>

              <div>
                {item.formaDePagamento === "Cartão de crédito" ||
                item.formaDePagamento === "Cartão de crédito"
                  ? `Final: ${item.cards[0]?.cardNumber?.slice(-4)}`
                  : item.docNumber}
              </div>

              <div>{item.numeroDeParcelas}</div>
              <div>{item.status === true ? "Ativa" : "Inativa"}</div>
              <div style={{ gap: "1rem", display: "flex " }}>
                <Link to={`/comprasList/${item.uuid}`}>
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

export default ComprasList;
