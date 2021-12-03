import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../helpers/BaseApi";

function AddContrato() {
  const [categorias, setCategorias] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Api.get("categorias", {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => setCategorias(resp.data));
  }, []);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      VencimentoDaFatura: parseInt(data.VencimentoDaFatura),
      mesesDeFidelidade: parseInt(data.mesesDeFidelidade),
      //   categoriaContrato: parseInt(data.categoriaContrato),
      valorDoContrato: parseFloat(data.valorDoContrato.replace(",", ".")),
      origem: "normal",
    };

    Api.post("/contratos", formData, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then(console.log);
    // }).then((resp) => navigate("/contratos"));
  };

  return (
    <div>
      {categorias.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="">Data de inicio do contrato (Opcional)</label>
            <input type="date" {...register("inicioDoContrato")} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Dia de vencimento da fatura</label>
            <input
              type="number"
              {...register("VencimentoDaFatura", { required: true })}
            />
            {errors.VencimentoDaFatura && (
              <span>Informe o dia de vencimento da sua fatura</span>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Descrição da fatura</label>
            <input
              type="text"
              placeholder="Ex: Internet, Plano de celular.."
              {...register("descricaoDoContrato", { required: true })}
            />
            {errors.descricaoDoContrato && (
              <span>Escreva uma breve descrição</span>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Valor mensal do contrato</label>
            <input
              placeholder="Apenas números. Ex: 109,90"
              {...register("valorDoContrato", { required: true })}
            />
            {errors.valorDoContrato && (
              <span>Informe o valor do seu contrato</span>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Possui fidelidade? </label>
            <select {...register("mesesDeFidelidade")}>
              <option>Não possui</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Status do contrato </label>
            <select {...register("statusDoContrato")}>
              <option>Ativo</option>
              <option>Inativo</option>
              <option>Em espera</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Categoria do contrato</label>
            <select {...register("categoriaContrato")}>
              {categorias.map((item, key) => (
                <option key={key} value={item.uuid}>
                  {item.nomeCategoria}
                </option>
              ))}
            </select>
            {/* {errors.valorDoContrato && (
            <span>Informe o valor do seu contrato</span>
          )} */}
          </FormGroup>

          <button type="submit">Enviar</button>
        </form>
      ) : (
        "Loading..."
      )}

      <Link to="/categorias">voltar</Link>
    </div>
  );
}

export default AddContrato;

const FormGroup = styled.div``;
