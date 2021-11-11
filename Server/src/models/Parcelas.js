module.exports = (sequelize, DataTypes) => {
  const Parcelas = sequelize.define("Parcelas", {
    valorParcela: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    vencimentoParcela: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numeroParcela: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Parcelas.associate = ({ Compras }) => {
    Parcelas.belongsTo(Compras, {
      as: "compra",
    });
  };

  return Parcelas;
};
