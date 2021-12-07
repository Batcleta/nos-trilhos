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
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statusDoCartão: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Cards;
};
