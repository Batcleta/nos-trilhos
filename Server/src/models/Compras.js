module.exports = (sequelize, DataTypes) => {
  const Compras = sequelize.define("Compras", {
    dataCompra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descriçãoCompra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCompra: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    possuiParcelamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Compras.associate = ({ Parcelas, Categorias, Users }) => {
    Compras.hasMany(Parcelas, {
      as: "parcelas",
      onDelete: "cascade",
      foreignKey: "compraId",
    });

    Compras.belongsToMany(Categorias, {
      as: "categoria",
      onDelete: "cascade",
      foreignKey: "compraId",
      through: "categoriaDaCompra",
    });

    Compras.belongsTo(Users, { as: "user" });
  };

  return Compras;
};
