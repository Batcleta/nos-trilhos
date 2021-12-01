const { Categorias } = require("../models");

module.exports = {
  async store(req, res) {
    Categorias.create(req.body).then((resp) => {
      res.json(resp);
    });
  },

  async findAll(req, res) {
    Categorias.findAll().then((resp) => {
      res.json(resp);
    });
  },

  async findOne(req, res) {
    Categorias.findByPk(req.params.uuid).then((resp) => {
      res.json(resp);
    });
  },

  async update(req, res) {
    Categorias.update(req.body, {
      where: {
        uuid: req.params.uuid,
      },
    }).then((resp) => res.json(resp));
  },

  async delete(req, res) {
    const { uuid } = req.params;

    Categorias.destroy({ where: { uuid: uuid } }).then((resp) => {
      if (resp === 1) {
        res.json({ message: "Categoria deletada com sucesso" });
      } else {
        res.json({ error: "Id incorreto ou categoria inexistente" });
      }
    });
  },
};
