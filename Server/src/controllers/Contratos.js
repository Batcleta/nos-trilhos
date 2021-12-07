const CriarContas = require("../middlewares/CriacaoDeConta");
const { Categorias, Contratos, Contas } = require("../models");

module.exports = {
  async store(req, res) {
    const { categoriaContrato } = req.body;

    Categorias.findByPk(categoriaContrato)
      .then(async (resp) => {
        if (!resp) res.json({ error: "Categoria não encontrada" });

        const contratos = await Contratos.create({
          ...req.body,
          userId: req.user.id,
        });

        await resp.addContratos(contratos);

        return contratos;
      })
      .then(async (resp) => {
        const criandoContas = CriarContas(
          resp.valorDoContrato,
          resp.mesesDeFidelidade,
          resp.VencimentoDaFatura,
          resp.inicioDoContrato
        );

        const promisse = criandoContas.map(async (element) => {
          await Contas.create({ ...element, contratoUuid: resp.uuid });
        });

        await Promise.all(promisse);

        const findContrato = await Contratos.findByPk(resp.uuid, {
          include: ["contas", "categoria"],
        });

        return findContrato;
      })
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => res.json({ error: err.message }));
  },

  // async findAll(req, res) {
  //   Contratos.findAll({
  //     include: ["categoria", "contas"],
  //   }).then((resp) => {
  //     const bilolagem = resp.map((item) => {
  //       const conta = item.contas.filter((item) => {
  //         const date = new Date("2021-12-10").getMonth();
  //         const lala = new Date(item.vencimentoDaConta).getMonth();
  //         return lala === date && item.statusDaConta === true;
  //       });

  //       return {
  //         contaDoMes: {
  //           descricaoDoContrato: item.descricaoDoContrato,
  //           userId: item.userId,
  //           mesesDeFidelidade: item.mesesDeFidelidade,
  //           categoria: item.categoria.map((item) => item.nomeCategoria),
  //           conta: conta,
  //         },
  //         contrato: { resp },
  //       };
  //     });

  //     res.json(bilolagem);
  //   });
  // },

  async findAll(req, res) {
    Contratos.findAll({
      order: [["descricaoDoContrato"], ["contas", "vencimentoDaConta", "asc"]],
      include: ["categoria", "contas"],
    }).then((resp) => res.json(resp));
  },

  async findOne(req, res) {
    const { uuid } = req.params;

    Contratos.findByPk(uuid, { include: ["categoria", "contas"] }).then(
      (resp) => res.json(resp)
    );
  },

  async update(req, res) {
    const { uuid } = req.params;

    Contratos.update(req.body, {
      where: {
        uuid: uuid,
      },
    }).then((resp) => {
      if (resp.length > 0) {
        res.json({ message: "ok" });
      } else {
        res.json({ error: "deu ruim " });
      }
    });
  },

  async delete(req, res) {
    const { id } = req.params;

    Contratos.destroy({ where: { id: id } }).then((resp) => {
      if (resp === 1) {
        res.json({ message: "Conta deletada com sucesso" });
      } else {
        res.json({ error: "Id incorreto ou conta inexistente" });
      }
    });
  },

  // contas
  async updateConta(req, res) {
    const contas = req.body;
    const promisse = contas.map(async (item) => {
      await Contas.update(item, {
        where: {
          uuid: item.uuid,
        },
      });
    });

    const teste = await Promise.all(promisse);

    if (teste.length > 0) {
      res.json({ message: "ok" });
    } else {
      res.jeon({ error: "deu ruim " });
    }
  },
};
