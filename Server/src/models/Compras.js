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
      allowNull: false,
    },
    totalCompra: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoDePagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metodoDePagamento: {
      type: DataTypes.STRING,
      allowNull: false,
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
