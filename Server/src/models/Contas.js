module.exports = (sequelize, DataTypes) => {
  const Contas = sequelize.define("Contas", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    vencimentoDaConta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observacoesDaConta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valorDaConta: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    statusDaConta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Contas.associate = ({ Contratos }) => {
    Contas.belongsTo(Contratos, {
      as: "contrato",
    });
  };

  return Contas;
};
