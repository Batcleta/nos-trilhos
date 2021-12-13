module.exports = (sequelize, DataTypes) => {
  const Parcelas = sequelize.define("Parcelas", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
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
