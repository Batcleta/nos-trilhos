const { RendaFixa, RendaMensal, Categorias } = require("../models");
const acharDiaUtil = require("../middlewares/setDayUtil");

module.exports = {
  async store(req, res) {
    const { categoriaDaRenda } = req.body;

    Categorias.findByPk(categoriaDaRenda)
      .then(async (resp) => {
        if (!resp) res.json({ error: "Categoria não encontrada" });

        const rendaFixa = await RendaFixa.create(req.body);

        await resp.addRendafixa(rendaFixa);

        return rendaFixa;
      })
      .then(async (resp) => {
        return await RendaMensal.create({
          dataDeRecebimentoMensal: acharDiaUtil(5, 2),
          valorRecebidoMensal: resp.valorRecebido,
          observações: "undefined",
          statusDaRendaMensal: true,
          rendaMensalId: resp.id,
        });
      })
      .then((resp) => res.json(resp));
  },
  async findAll(req, res) {
    RendaFixa.findAll({
      include: "rendamensal",
    }).then((resp) => {
      res.json(resp);
    });
  },
  async delete(req, res) {
    const { id } = req.params;

    Categorias.destroy({ where: { id: id } }).then((resp) => {
      if (resp === 1) {
        res.json({ message: "Categoria deletada com sucesso" });
      } else {
        res.json({ error: "Id incorreto ou categoria inexistente" });
      }
    });
  },
};
