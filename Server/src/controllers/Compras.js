const Parcelamento = require("../middlewares/Parcelamento");
const { Categorias, Compras, Parcelas } = require("../models");

module.exports = {
  async store(req, res) {
    const { categoria, possuiParcelamento, totalCompra, dataCompra } = req.body;

    const findCategoria = await Categorias.findByPk(categoria);
    if (!findCategoria) {
      res.json({ error: "Categoria não encontrada" });
    } else {
      const compras = await Compras.create({
        ...req.body,
        userId: req.user.id,
      });

      await findCategoria.addCompras(compras);

      if (possuiParcelamento) {
        const dadosParcelamento = Parcelamento(
          totalCompra,
          possuiParcelamento,
          15,
          10,
          dataCompra
        );

        await dadosParcelamento.forEach((element) => {
          Parcelas.create({ ...element, compraId: compras.id });
        });
      }

      const result = await Compras.findOne({
        where: { descriçãoCompra: req.body.descriçãoCompra },
        include: [{ association: "categoria" }, { association: "parcelas" }],
      });

      res.json(result);
    }
  },

  async findAll(req, res) {
    Compras.findAll({
      include: [{ association: "categoria" }, { association: "parcelas" }],
    }).then((resp) => res.json(resp));
  },

  async delete(req, res) {
    const { id } = req.params;

    Compras.destroy({ where: { id: id } }).then((resp) => {
      if (resp === 1) {
        res.json({ message: "Compra deletada com sucesso" });
      } else {
        res.json({ error: "Id incorreto ou compra inexistente" });
      }
    });
  },
};
