const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    const { password } = req.body;

    bcrypt
      .hash(password, 10)
      .then((hash) => Users.create({ ...req.body, password: hash }))
      .then((resp) => {
        res.json(resp);
      });
  },

  async findAll(req, res) {
    Users.findAll({
      attributes: {
        exclude: ["id", "password", "authorization", "createdAt", "updatedAt"],
      },
      include: [
        {
          association: "contratos",
          attributes: {
            // exclude: ["id"],
          },
          include: [
            {
              association: "categoria",
              attributes: {
                // exclude: ["id"],
              },
            },
            {
              association: "contas",
              attributes: {
                // exclude: ["id"],
              },
            },
          ],
        },
      ],
    }).then((resp) => {
      res.json(resp);
    });
  },

  async login(req, res) {
    const { username, password } = req.body;

    Users.findOne({ where: { username: username } }).then((user) => {
      if (!user) res.json({ error: "Usuário não existe" });

      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          res.json({
            error: "A senha informada nao corresponde com a cadastrada",
          });
        }

        const apiKey = sign(
          {
            username: user.username,
            id: user.id,
            authorization: user.authorization,
          },
          "importantsecret"
        );
        res.json({
          apiKey: apiKey,
          username: user.username,
          id: user.id,
          authorization: user.authorization,
        });
      });
    });
  },
};
