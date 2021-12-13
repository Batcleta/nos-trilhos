module.exports = (sequelize, DataTypes) => {
  const RendaVariavel = sequelize.define("RendaVariavel", {
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
  });

  RendaVariavel.associate = ({ Users, Categorias }) => {
    RendaVariavel.belongsToMany(Categorias, {
      as: "categoria",
      onDelete: "cascade",
      foreignKey: "rendaVariavelId",
      through: "categoriaDaRendaVariável",
    });

    RendaVariavel.belongsTo(Users, {
      as: "user",
    });
  };

  return RendaVariavel;
};

// Caso o tipo da renda for salário, quero fazer o calculo do 13º salário e futuramente calculo de férias
