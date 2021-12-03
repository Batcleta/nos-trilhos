import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../helpers/BaseApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/MainContext";

function Login() {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const [loginError, setLoginError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api.post("/users/login", data).then((resp) => {
      if (resp.data.error) {
        setLoginError(resp.data);
      } else {
        localStorage.setItem("apiKey", resp.data.apiKey);
        setAuthState({
          username: resp.data.username,
          id: resp.data.id,
          authorization: resp.data.authorization,
          status: true,
        });
        navigate("/dashboard");
      }
    });
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <h3>Login</h3>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label>Cu do arthur</label>
            <input
              placeholder="Informe seu usuário"
              {...register(`username`, {
                required: true,
              })}
            />
            {errors?.username && <small>Informe seu nome de usuário</small>}
          </FormGroup>
          <FormGroup>
            <label>Senha</label>
            <input
              type="password"
              {...register(`password`, {
                required: true,
              })}
            />
            {errors?.password && <small>Informe sua senha</small>}
          </FormGroup>
          {loginError && (
            <>
              <small>{loginError.error}</small>
              <br />
            </>
          )}

          <SubmitButton type="submit">Entrar</SubmitButton>
        </FormWrapper>
      </LoginContainer>
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div``;
const LoginContainer = styled.div``;
const FormWrapper = styled.form``;
const FormGroup = styled.div``;
const SubmitButton = styled.button``;
