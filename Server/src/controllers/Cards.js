const { Cards } = require("../models");

module.exports = {
  async store(req, res) {
    const date = new Date(`01/${req.body.expireDate}`);
    Cards.create({ ...req.body, statusDoCartão: true, expireDate: date }).then(
      (resp) => res.json(resp)
    );
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
