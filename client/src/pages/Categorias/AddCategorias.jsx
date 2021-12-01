import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../helpers/BaseApi";

function AddCategorias() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = { ...data, status: data.status === "1" ? true : false };
    Api.post("/categorias", formData)
      .then((resp) => console.log(resp))
      .then(navigate("/categorias"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("nomeCategoria", { required: true })} />
        {errors.nomeCategoria && <span>Informe o nome da categoria</span>}
        {/* include validation with required or other standard HTML validation rules */}
        <select {...register("tipoCategoria", { required: true })}>
          <option value="">Escolha uma opção</option>
          <option value="Despesas">Despesas</option>
          <option value="Receitas">Receitas</option>
        </select>
        {errors.tipoCategoria && <span>Informe o tipo da categoria</span>}

        <select {...register("status", { required: true })}>
          <option value="">Escolha uma opção</option>
          <option value="1">Ativa</option>
          <option value="0">Inativa</option>
        </select>
        {errors.status && <span>Categoria ativa ou inativa? </span>}

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <button type="submit">Enviar</button>
      </form>

      <Link to="/categorias">voltar</Link>
    </div>
  );
}

export default AddCategorias;
