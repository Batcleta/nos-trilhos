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
  const watchTipoDePagamento = watch("tipoPagamento");
  const watchFormaDePagamento = watch("formaPagamento");
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
    let newData;

    if (data.tipoPagamento !== "a vista") {
      const { ...rest } = data;
      newData = rest;
    } else {
      const { possuiParcelamento, numeroDeParcelas, ...rest } = data;

      if (data.formaPagamento === "Dinheiro") {
        const { docNumber, ...all } = rest;
        newData = all;
      } else {
        newData = rest;
      }
    }

    const toDate = data.dataCompra.split("/");
    newData.dataCompra = new Date(`${toDate[2]}/${toDate[1]}/${toDate[0]}`);
    console.log(newData);
  };

  return (
    <div>
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
          <select {...register("tipoPagamento", { required: true })}>
            <option value="">Escolha</option>
            <option value="a vista">A vista</option>
            <option value="a prazo">A prazo</option>
          </select>
          {errors.metodoPagamento && (
            <span>Informe um método de pagamento</span>
          )}
        </FormGroup>

        {watchTipoDePagamento === "a vista" && (
          <>
            <FormGroup>
              <label htmlFor="">Pagamento à vista</label>
              <select {...register("formaPagamento", { required: true })}>
                <option value="">Escolha</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Boleto a vista">Boleto á vista</option>
                <option value="débito">Débito</option>
                <option value="Pix">Pix</option>
              </select>
              {errors.aVista && <span>Informe um método de pagamento</span>}
            </FormGroup>

            {watchFormaDePagamento === "Boleto a vista" && (
              <FormGroup>
                <label htmlFor="">(opcional) Numero do documento</label>
                <input
                  type="text"
                  placeholder="Ex: Internet, Plano de celular.."
                  defaultValue={"ds"}
                  {...register("docNumber")}
                />
              </FormGroup>
            )}

            {watchFormaDePagamento === "Pix" && (
              <FormGroup>
                <label htmlFor="">(opcional) Cadastrar contatos pix</label>
                <input
                  type="text"
                  placeholder="Ex: Internet, Plano de celular.."
                  {...register("docNumber")}
                />
              </FormGroup>
            )}

            {watchFormaDePagamento === "débito" && (
              <FormGroup>
                <label htmlFor="">Escolha um cartão (filtrar débito)</label>
                <select
                  placeholder="Apenas números. Ex: 109,90"
                  {...register("docNumber", { required: true })}
                >
                  {cartoes
                    .filter(
                      (item) =>
                        item.tipoCartao === "1" || item.tipoCartao === "3"
                    )
                    .map((item, key) => (
                      <option key={key} value={item.uuid}>
                        {`${item.cardNickname} - ${item.cardNumber.slice(-4)}`}
                      </option>
                    ))}
                </select>
                <Link to="/cardsList">cadastre um novo cartão</Link>
                {errors.docNumber && <span>Informe um cartão válido</span>}
              </FormGroup>
            )}
          </>
        )}

        {watchTipoDePagamento === "a prazo" && (
          <>
            <FormGroup>
              <label htmlFor="">Formas de pagamento</label>
              <select {...register("formaPagamento", { required: true })}>
                <option value="">Escolha</option>
                <option value="Boleto a prazo">Boleto á prazo</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
              </select>
              {errors.aPrazo && <span>Informe um método de pagamento</span>}
            </FormGroup>

            {watchFormaDePagamento === "Boleto a prazo" && (
              <FormGroup>
                <label htmlFor="">(opcional) Numero do documento</label>
                <input
                  type="text"
                  placeholder="Ex: Internet, Plano de celular.."
                  {...register("docNumber")}
                />
              </FormGroup>
            )}

            {watchFormaDePagamento === "Cartão de crédito" && (
              <FormGroup>
                <label htmlFor="">Escolha um cartão (filtrar crédito)</label>
                <select
                  placeholder="Apenas números. Ex: 109,90"
                  {...register("docNumber", { required: true })}
                >
                  {cartoes
                    .filter(
                      (item) =>
                        item.tipoCartao === "2" || item.tipoCartao === "3"
                    )
                    .map((item, key) => (
                      <option key={key} value={item.uuid}>
                        {`${item.cardNickname} - ${item.cardNumber.slice(-4)}`}
                      </option>
                    ))}
                </select>
                <Link to="/cardsList">cadastre um novo cartão</Link>
                {errors.docNumber && <span>Informe um cartão válido</span>}
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
          <select {...register("categoriaContrato", { required: true })}>
            {categorias.map((item, key) => (
              <option key={key} value={item.uuid}>
                {item.nomeCategoria}
              </option>
            ))}
          </select>
          <Link to="/addCategoria">cadastre uma categoria</Link>
          {errors.categoriaContrato && <span>Informe uma categoria</span>}
        </FormGroup>

        <button type="submit">Enviar</button>
      </form>

      <Link to="/contratos">voltar</Link>
    </div>
  );
}

export default AddCompras;

const FormGroup = styled.div``;
