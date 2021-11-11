const { Categorias } = require("../models");

module.exports = {
  async store(req, res) {
    Categorias.create({ ...req.body }).then((resp) => {
      res.json(resp);
    });
  },
  async findAll(req, res) {
    Categorias.findAll().then((resp) => {
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
