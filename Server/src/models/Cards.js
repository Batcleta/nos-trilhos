module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define("Cards", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    cardNickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoCartao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechamentoFatura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vencimentoFatura: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    statusDoCartão: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Cards.associate = ({ Compras }) => {
    Cards.hasMany(Compras, {
      as: "compras",
      onDelete: "cascade",
      foreignKey: "cardUuid",
    });
  };

  return Cards;
};
