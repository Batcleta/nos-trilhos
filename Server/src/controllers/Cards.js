const { Cards } = require("../models");

module.exports = {
  async store(req, res) {
    Cards.create({ ...req.body })
      .then((resp) => res.json(resp))
      .catch((err) => res.send(err));
  },

  async findAll(req, res) {
    Cards.findAll().then((resp) => res.json(resp));
  },

  async findOne(req, res) {
    Cards.findByPk(req.params.uuid).then((resp) => {
      res.json(resp);
    });
  },

  async update(req, res) {
    Cards.update(req.body, {
      where: {
        uuid: req.params.uuid,
      },
    }).then((resp) => res.json(resp));
  },

  async delete(req, res) {},
};
