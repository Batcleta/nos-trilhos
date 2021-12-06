import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../helpers/BaseApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import convertDate from "../../componentes/funcionals/convertDate";

function ContratoId() {
  const { uuid } = useParams();
  const [contrato, setContrato] = useState({});
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sortByDate = (contas) => {
    if (contas) {
      contas.sort(function (a, b) {
        var dateA = new Date(a.vencimentoDaConta),
          dateB = new Date(b.vencimentoDaConta);
        return dateA - dateB;
      });
    }
  };

  sortByDate(contrato.contas);

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

    Api.put("/contratos/contas", contrato.contas, {
      headers: {
        apiKey: localStorage.getItem("apiKey"),
      },
    }).then((resp) => {
      if (resp.data.message) {
        alert("Alterado com sucesso");
        navigate("/contratos");
      } else {
        alert("deu ruim filhão");
      }
    });
  };
  // Converte a data para o padrão do input
  const getDate = (data) => {
    const date = new Date(data);
    return `${date.getFullYear()}-${date.getMonth() <= 9 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate()}`;
  };

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
