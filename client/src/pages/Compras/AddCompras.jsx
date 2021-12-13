import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../helpers/BaseApi";

function AddCompras() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [categorias, setCategorias] = useState([]);
  const [cartoes, setCartoes] = useState([]);
  const watchMetodosDePagamento = watch("metodoPagamento");
  const watchPagamentoAPrazo = watch("aPrazo");
  const watchParcelamento = watch("possuiParcelamento");

  useEffect(() => {
    (() =>
      Api.get("categorias", {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => setCategorias(resp.data)))();

    (() =>
      Api.get("cards", {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => setCartoes(resp.data)))();
  }, []);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = {};

    if (data.metodoPagamento === "a vista") {
    } else {
    }

    // enviar formData
  };

  return (
    <div>
      {categorias.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="">Data da compra</label>
            <input
              placeholder="Ex: data da compra"
              {...register("dataCompra", { required: true })}
            />
            {errors.dataCompra && <span>Data da compra</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Descrição da compra</label>
            <input
              type="text"
              placeholder="Ex: Internet, Plano de celular.."
              {...register("descriçãoCompra", { required: true })}
            />
            {errors.descriçãoCompra && <span>Escreva uma breve descrição</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Total da compra</label>
            <input
              placeholder="Apenas números. Ex: 109,90"
              {...register("totalCompra", { required: true })}
            />
            {errors.totalCompra && <span>Informe o total da compra</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Método utilizado</label>
            <select {...register("metodoPagamento", { required: true })}>
              <option value="">Escolha</option>
              <option value="a vista">A vista</option>
              <option value="a prazo">A prazo</option>
            </select>
            {errors.metodoPagamento && (
              <span>Informe um método de pagamento</span>
            )}
          </FormGroup>

          {watchMetodosDePagamento === "a vista" && (
            <FormGroup>
              <label htmlFor="">Pagamento à vista</label>
              <select {...register("aVista", { required: true })}>
                <option value="">Escolha</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Boleto a vista">Boleto á vista</option>
                <option value="débito">Débito</option>
                <option value="Pix">Pix</option>
              </select>
              {errors.aVista && <span>Informe um método de pagamento</span>}
            </FormGroup>
          )}

          {watchMetodosDePagamento === "a prazo" && (
            <>
              <FormGroup>
                <label htmlFor="">Formas de pagamento</label>
                <select {...register("aPrazo", { required: true })}>
                  <option value="">Escolha</option>
                  <option value="Boleto a prazo">Boleto á prazo</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                </select>
                {errors.aPrazo && <span>Informe um método de pagamento</span>}
              </FormGroup>

              {watchPagamentoAPrazo === "Boleto a prazo" && (
                <FormGroup>
                  <label htmlFor="">(opcional) Numero do documento</label>
                  <input
                    type="text"
                    placeholder="Ex: Internet, Plano de celular.."
                    {...register("docNumber")}
                  />
                </FormGroup>
              )}

              {watchPagamentoAPrazo === "Cartão de crédito" && (
                <FormGroup>
                  <label htmlFor="">Escolha um cartão cadastrado</label>
                  <select
                    placeholder="Apenas números. Ex: 109,90"
                    {...register("cardUuid")}
                  >
                    {cartoes.map((item, key) => (
                      <option key={key} value={item.uuid}>
                        {`${item.cardNickname} - ${item.cardNumber.slice(-4)}`}
                      </option>
                    ))}
                  </select>
                  <Link to="/cardsList">cadastre um novo cartão</Link>
                </FormGroup>
              )}

              <FormGroup>
                <label htmlFor="">Compra parcelada?</label>
                <select
                  defaultValue={"1"}
                  placeholder="Apenas números. Ex: 109,90"
                  {...register("possuiParcelamento", { required: true })}
                >
                  <option value="">Escolha</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </FormGroup>

              {watchParcelamento === "Sim" && (
                <FormGroup>
                  <label htmlFor="">Numero de parcelas </label>
                  <input
                    defaultValue={"1"}
                    placeholder="Apenas números. Ex: 109,90"
                    {...register("numeroDeParcelas", { required: true })}
                  />
                  {errors.numeroDeParcelas && (
                    <span>Informe o numero das parcelas</span>
                  )}
                </FormGroup>
              )}
            </>
          )}

          <FormGroup>
            <label htmlFor="">Categoria da compra </label>
            <select {...register("categoriaContrato")}>
              {categorias.map((item, key) => (
                <option key={key} value={item.uuid}>
                  {item.nomeCategoria}
                </option>
              ))}
            </select>
          </FormGroup>

          <button type="submit">Enviar</button>
        </form>
      ) : (
        "Modal: é necessário cadastrar ua categoria para criação de compras <ir para categorias>"
      )}

      <Link to="/contratos">voltar</Link>
    </div>
  );
}

export default AddCompras;

const FormGroup = styled.div``;
