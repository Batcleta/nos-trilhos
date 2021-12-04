import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../helpers/BaseApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function ContratoId() {
  const { uuid } = useParams();
  const [contrato, setContrato] = useState({});
  const [categorias, setCategorias] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      await Api.get(`/contratos/${uuid}`, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => {
        setContrato(resp.data);
      });
    })();

    (async () => {
      await Api.get("categorias", {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => setCategorias(resp.data));
    })();
  }, []);

  const onUpdate = (data) => {
    const formData = {
      ...data,
      VencimentoDaFatura: parseInt(data.VencimentoDaFatura),
      mesesDeFidelidade: parseInt(data.mesesDeFidelidade),
      categoriaContrato: data.categoriaContrato
        ? data.categoriaContrato
        : contrato.categoriaContrato,
      valorDoContrato: parseFloat(data.valorDoContrato.replace(",", ".")),
      origem: "normal",
    };

    console.log(formData);
  };

  const getDate = (data) => {
    const date = new Date(data);
    return `${date.getFullYear()}-${date.getMonth() <= 9 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate()}`;
  };

  return (
    <div>
      {contrato.uuid ? (
        <div>
          <form onSubmit={handleSubmit(onUpdate)}>
            <FormGroup>
              <label htmlFor="">Descrição</label>
              <input
                defaultValue={contrato?.descricaoDoContrato}
                {...register("descricaoDoContrato", { required: true })}
              />
              {errors.descricaoDoContrato && (
                <span>Por favor, informe uma descrição</span>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="">Inicio do contrato</label>
              <input
                type="date"
                defaultValue={getDate(contrato?.inicioDoContrato)}
                {...register("inicioDoContrato")}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="">Categoria do contrato</label>
              <select {...register("categoriaContrato")}>
                <option value={contrato.categoriaContrato}>
                  {contrato.categoria[0].nomeCategoria}
                </option>
                {categorias
                  ?.filter((item) => item.uuid !== contrato.categoriaContrato)
                  .map((item, key) => (
                    <option key={key} value={item.uuid}>
                      {item.nomeCategoria}
                    </option>
                  ))}
              </select>
            </FormGroup>

            <FormGroup>
              <label htmlFor="">Valor do contrato</label>
              <input
                defaultValue={contrato?.valorDoContrato}
                {...register("valorDoContrato", { required: true })}
              />
              {errors.valorDoContrato && (
                <span>Por favor, informe o valor do contrato</span>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="">Vencimento da fatura</label>
              <input
                defaultValue={contrato?.VencimentoDaFatura}
                {...register("VencimentoDaFatura", { required: true })}
              />
              {errors.VencimentoDaFatura && (
                <span>Por favor, informe a data de vencimento da fatura</span>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="">Status do contrato </label>
              <select
                defaultValue={contrato?.statusDoContrato}
                {...register("statusDoContrato")}
              >
                <option>Ativo</option>
                <option>Inativo</option>
                <option>Em espera</option>
              </select>
              {errors.statusDoContrato && (
                <span>Por favor, informe o status do contrato</span>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="">Tempo de fidelidade</label>
              <input
                type="number"
                defaultValue={contrato?.mesesDeFidelidade}
                {...register("mesesDeFidelidade", { required: true })}
              />
              {errors.mesesDeFidelidade && (
                <span>Por favor, informe a fidelidade</span>
              )}
            </FormGroup>

            <button type="submit">Enviar</button>
          </form>

          <Link to="/categorias">voltar</Link>
        </div>
      ) : (
        "locading..."
      )}
    </div>
  );
}

export default ContratoId;

const FormGroup = styled.div``;
