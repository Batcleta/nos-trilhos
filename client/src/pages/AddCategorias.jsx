import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function AddCategorias() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("nomeCategoria")} />
        {/* include validation with required or other standard HTML validation rules */}
        <select {...register("tipoCategoria", { required: true })}>
          <option value="">Escolha uma opção</option>
          <option value="1">Receitas</option>
          <option value="2">Despesas</option>
        </select>
        <select {...register("status", { required: true })}>
          <option value="">Escolha uma opção</option>
          <option value="1">Ativa</option>
          <option value="2">Inativa</option>
        </select>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <button type="submit">Enviar</button>
      </form>

      <Link to="/categorias">voltar</Link>
    </div>
  );
}

export default AddCategorias;
