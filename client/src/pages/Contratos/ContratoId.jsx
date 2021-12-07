import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../helpers/BaseApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import convertDate from "../../componentes/funcionals/convertDate";

function ContratoId() {
  const { uuid } = useParams();
  const [contrato, setContrato] = useState({});
  const [contasList, setContasList] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  ((contas) => {
    if (contas) {
      contas.sort(function (a, b) {
        var dateA = new Date(a.vencimentoDaConta),
          dateB = new Date(b.vencimentoDaConta);
        return dateA - dateB;
      });
    }
  })(contrato.contas);

  useEffect(() => {
    (async () => {
      await Api.get(`/contratos/${uuid}`, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => {
        setContrato(resp.data);
        resp.data.contas.forEach((item) => setContasList(item));
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

  const onUpdate = async (data) => {
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

    const { contas, categoria, userId, uuid, updatedAt, createdAt, ...rest } =
      contrato;

    if (JSON.stringify(rest) !== JSON.stringify(formData)) {
      await Api.put(`/contratos/update/${uuid}`, formData, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      }).then((resp) => {
        console.log(resp);
        // if (resp.data.message) {
        //   // allClear.contratosUpdate = true;
        // } else {
        //   allClear.contratosUpdate = false;
        // }
      });
    }

    // await Api.put("/contratos/contas", contrato.contas, {
    //   headers: {
    //     apiKey: localStorage.getItem("apiKey"),
    //   },
    // }).then((resp) => {
    //   if (resp.data.message) {
    //     allClear.contasUpdate = true;
    //   } else {
    //     allClear.contasUpdate = false;
    //   }
    // });

    // console.log(allClear);
  };

  // Converte a data para o padrão do input
  const getDate = (data) => {
    const date = new Date(data);
    return `${date.getFullYear()}-${date.getMonth() <= 9 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate() <= 9 ? "0" : ""}${date.getDate() + 1} `;
  };
  const inicioDoContrato = getDate(contrato?.inicioDoContrato);
  console.log(inicioDoContrato.toString());
  console.log("2021-09-07");

  // Da baixa ou reativa uma conta
  const baixaDeConta = (conta, status) => {
    // const data = { ...conta, statusDaConta: !status };
    // Api.put("/contratos/contas", data, {
    //   headers: {
    //     apiKey: localStorage.getItem("apiKey"),
    //   },
    // }).then((resp) => {
    const updated = contrato.contas.filter(
      (item) => item.uuid === conta.uuid
    )[0];
    updated.statusDaConta = !status;
    setContrato({ ...contrato, ...contrato.contas, updated });
    // });
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
                defaultValue={getDate()}
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

            <FormGroup>
              <label htmlFor="">Origem do contrato:</label>
              <input
                defaultValue={contrato?.origem}
                {...register("origem", { required: true })}
              />
              {errors.origem && (
                <span>Por favor, informe a origem do contrato</span>
              )}
            </FormGroup>

            <hr />

            <div>
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  fontWeight: "bold",
                }}
              >
                <div>Data de vencimento</div>
                <div>Observações</div>
                <div>Valor da conta</div>
                <div>Status</div>
              </div>
              {contrato.contas.map((item, key) => (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(5, 1fr)",
                  }}
                >
                  <div>{convertDate(item.vencimentoDaConta)}</div>
                  <div>{item.observacoesDaConta}</div>
                  <div>{item.valorDaConta}</div>
                  <div>{item.statusDaConta ? "ativa" : "Baixada"}</div>
                  {item.statusDaConta ? (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => baixaDeConta(item, item.statusDaConta)}
                    >
                      Baixar conta
                    </div>
                  ) : (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => baixaDeConta(item, item.statusDaConta)}
                    >
                      Reativar conta
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button type="submit">Salvar</button>
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
