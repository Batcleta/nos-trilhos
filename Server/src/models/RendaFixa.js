module.exports = (sequelize, DataTypes) => {
  const RendaFixa = sequelize.define("RendaFixa", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    dataDeRecebimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    diaUtilDeRecebimento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valorRecebido: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tipoDaRenda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricaoDaRenda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusDaRenda: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  RendaFixa.associate = ({ Users, RendaMensal, Categorias }) => {
    RendaFixa.belongsToMany(Categorias, {
      as: "categoria",
      onDelete: "cascade",
      foreignKey: "rendaFixaId",
      through: "categoriaDaRendaFixa",
    });

    RendaFixa.hasMany(RendaMensal, {
      as: "rendamensal",
      onDelete: "cascade",
      foreignKey: "rendaMensalId",
    });

    RendaFixa.belongsTo(Users, {
      as: "user",
    });
  };

  return RendaFixa;
};

// Caso o tipo da renda for salário, quero fazer o calculo do 13º salário e futuramente calculo de férias
