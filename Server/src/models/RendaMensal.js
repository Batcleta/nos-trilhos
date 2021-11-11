module.exports = (sequelize, DataTypes) => {
  const RendaMensal = sequelize.define("RendaMensal", {
    dataDeRecebimentoMensal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valorRecebidoMensal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    observações: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statusDaRendaMensal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  RendaMensal.associate = ({ RendaFixa }) => {
    RendaMensal.belongsTo(RendaFixa, {
      as: "rendaMensal",
    });
  };

  return RendaMensal;
};

// Caso o tipo da renda for salário, quero fazer o calculo do 13º salário e futuramente calculo de férias
