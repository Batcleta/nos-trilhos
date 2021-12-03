import React from "react";
import { useForm } from "react-hook-form";
import Api from "../helpers/BaseApi";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

function NovoUsuário() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Api.post("/users", data).then((resp) => {
      if (resp.data.erro) {
        console.log(resp.data.erro);
      }
      navigate("/");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="">Nome completo</label>
          <input {...register("nomeDoUsuario", { required: true })} />
          {errors.nomeDoUsuario && <span>Informe seu nome completo</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Nome de usuário</label>
          <input {...register("username", { required: true })} />
          {errors.username && <span>Informe um nome de login</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Senha</label>
          <input type="text" {...register("password", { required: true })} />
          {errors.password && <span>Informe um password</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Role</label>
          <select
            defaultValue="Administrador"
            {...register("authorization", { required: true })}
          >
            <option value="Administrador">Administrador</option>
            <option value="Operador">Operador</option>
          </select>
          {errors.authorization && (
            <span>Informe seu nível de autorização</span>
          )}
        </FormGroup>

        <button type="submit">Enviar</button>
      </form>

      <Link to="/categorias">voltar</Link>
    </div>
  );
}

export default NovoUsuário;

const FormGroup = styled.div``;
