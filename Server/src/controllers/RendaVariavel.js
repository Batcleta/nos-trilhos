const { RendaVariavel, Categorias } = require("../models");

module.exports = {
  async store(req, res) {
    const { categoriaDaRenda } = req.body;

    Categorias.findByPk(categoriaDaRenda)
      .then(async (resp) => {
        if (!resp) res.json({ error: "Categoria não encontrada" });

        const rendaVariavel = await RendaVariavel.create(req.body);

        await resp.addRendavariavel(rendaVariavel);

        return rendaVariavel;
      })
      .then((resp) => {
        res.json(resp);
      });
  },
  async findAll(req, res) {
    RendaVariavel.findAll({ include: "categoria" }).then((resp) => {
      res.json(resp);
    });
  },
  async delete(req, res) {},
};
