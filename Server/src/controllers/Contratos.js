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
          resp.vencimentoDoContrato,
          resp.inicioDoContrato
        );

        const promisse = criandoContas.map(async (element) => {
          await Contas.create({ ...element, contratoId: resp.id });
        });

        await Promise.all(promisse);

        const findContrato = await Contratos.findByPk(resp.id, {
          include: ["contas", "categoria"],
        });

        return findContrato;
      })
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => res.json({ error: err.message }));
  },

  async findAll(req, res) {
    Contratos.findAll({
      include: ["categoria", "contas"],
    }).then((resp) => res.json(resp));
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
};
