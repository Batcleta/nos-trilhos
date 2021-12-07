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

  async findOne(req, res) {},

  async update(req, res) {},

  async delete(req, res) {},
};
