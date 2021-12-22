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
  const watchTipoDePagamento = watch("tipoDePagamento");
  const watchFormaDePagamento = watch("formaDePagamento");
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

    if (data.tipoDePagamento !== "a vista") {
      const { ...rest } = data;
      newData = rest;
    } else {
      const { possuiParcelamento, numeroDeParcelas, ...rest } = data;

      if (data.formaDePagamento === "Dinheiro") {
        const { docNumber, ...all } = rest;
        newData = all;
      } else {
        newData = rest;
      }
    }

    const toDate = data.dataDaCompra.split("/");
    newData.dataDaCompra = new Date(`${toDate[2]}/${toDate[1]}/${toDate[0]}`);
    newData.numeroDeParcelas =
      data.possuiParcelamento === undefined ||
      data.possuiParcelamento === null ||
      data.possuiParcelamento === "Não"
        ? 1
        : data.numeroDeParcelas;

    newData.status = true;
    newData.totalDaCompra = parseFloat(data.totalDaCompra.replace(",", "."));
    Api.post("/compras", newData, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      .then((resp) => console.log(resp))
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h3>Nova compra</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="">Data da compra</label>
          <input
            placeholder="Ex: data da compra"
            {...register("dataDaCompra", { required: true })}
          />
          {errors.dataDaCompra && <span>Data da compra</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Descrição da compra</label>
          <input
            type="text"
            placeholder="Ex: Internet, Plano de celular.."
            {...register("descricaoDaCompra", { required: true })}
          />
          {errors.descricaoDaCompra && <span>Escreva uma breve descrição</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">(Opcional) Nome do estabelecimento</label>
          <input
            placeholder="Apenas números. Ex: 109,90"
            {...register("nomeDoEstabelecimento")}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Total da compra</label>
          <input
            placeholder="Apenas números. Ex: 109,90"
            {...register("totalDaCompra", { required: true })}
          />
          {errors.totalDaCompra && <span>Informe o total da compra</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Método utilizado</label>
          <select {...register("tipoDePagamento", { required: true })}>
            <option value="">Escolha</option>
            <option value="a vista">A vista</option>
            <option value="a prazo">A prazo</option>
          </select>
          {errors.tipoDePagamento && <span>Informe um tipo de pagamento</span>}
        </FormGroup>

        {watchTipoDePagamento === "a vista" && (
          <>
            <FormGroup>
              <label htmlFor="">Pagamento à vista</label>
              <select {...register("formaDePagamento", { required: true })}>
                <option value="">Escolha</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Boleto a vista">Boleto á vista</option>
                <option value="débito">Débito</option>
                <option value="Pix">Pix</option>
              </select>
              {errors.formaDePagamento && (
                <span>Informe um método de pagamento</span>
              )}
            </FormGroup>

            {watchFormaDePagamento === "Boleto a vista" && (
              <FormGroup>
                <label htmlFor="">(opcional) Numero do documento</label>
                <input
                  type="text"
                  placeholder="Ex: Internet, Plano de celular.."
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
              <select {...register("formaDePagamento", { required: true })}>
                <option value="">Escolha</option>
                <option value="Boleto a prazo">Boleto á prazo</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
              </select>
              {errors.formaDePagamento && (
                <span>Informe um método de pagamento</span>
              )}
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
                {...register("possuiParcelamento")}
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
          <select {...register("categoriaCompra", { required: true })}>
            {categorias.map((item, key) => (
              <option key={key} value={item.uuid}>
                {item.nomeCategoria}
              </option>
            ))}
          </select>
          <Link to="/addCategoria">cadastre uma categoria</Link>
          {errors.categoriaCompra && <span>Informe uma categoria</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Observações</label>
          <input type="text" {...register("observacoes")} />
        </FormGroup>

        <button type="submit">Enviar</button>
      </form>

      <Link to="/comprasList">voltar</Link>
    </div>
  );
}

export default AddCompras;

const FormGroup = styled.div``;
