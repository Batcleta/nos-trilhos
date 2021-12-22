module.exports = (sequelize, DataTypes) => {
  const Compras = sequelize.define("Compras", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    dataDaCompra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descricaoDaCompra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeDoEstabelecimento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalDaCompra: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipoDePagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formaDePagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    docNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numeroDeParcelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Compras.associate = ({ Parcelas, Categorias, Users, Cards }) => {
    Compras.hasMany(Parcelas, {
      as: "parcelas",
      onDelete: "cascade",
      foreignKey: "compraUuid",
    });

    Compras.belongsToMany(Categorias, {
      as: "categoria",
      onDelete: "cascade",
      foreignKey: "compraUuid",
      through: "categoriaDaCompra",
    });

    Compras.belongsToMany(Cards, {
      as: "cards",
      onDelete: "cascade",
      foreignKey: "compraUuid",
      through: "CardDaCompra",
    });

    Compras.belongsTo(Users, { as: "user" });
  };

  return Compras;
};
