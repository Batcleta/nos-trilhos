const Parcelamento = require("../middlewares/Parcelamento");
const { Categorias, Compras, Parcelas, Cards } = require("../models");

module.exports = {
  async store(req, res) {
    const {
      categoriaCompra,
      numeroDeParcelas,
      totalDaCompra,
      dataDaCompra,
      docNumber,
    } = req.body;

    const findCategoria = await Categorias.findByPk(categoriaCompra);
    if (!findCategoria) {
      res.json({ error: "Categoria não encontrada" });
    } else {
      const compras = await Compras.create({
        ...req.body,
        userId: req.user.id,
      });

      await findCategoria.addCompras(compras);

      const findCard = await Cards.findByPk(docNumber);

      if (!findCard) {
        res.json({ error: "Cartão não encontrado" });
      }

      await findCard.addCompras(compras);

      if (numeroDeParcelas) {
        const dadosParcelamento = Parcelamento(
          totalDaCompra,
          numeroDeParcelas,
          findCard.vencimentoFatura || 15,
          findCard.fechamentoFatura || 10,
          dataDaCompra
        );

        await dadosParcelamento.forEach((element) => {
          Parcelas.create({ ...element, compraUuid: compras.uuid });
        });
      }

      const result = await Compras.findOne({
        where: { descricaoDaCompra: req.body.descricaoDaCompra },
        include: [{ association: "categoria" }, { association: "parcelas" }],
      });

      res.json(result);
    }
  },

  async findAll(req, res) {
    Compras.findAll({
      include: [
        { association: "categoria" },
        { association: "parcelas" },
        { association: "cards" },
      ],
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
