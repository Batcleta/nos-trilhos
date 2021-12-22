module.exports = (sequelize, DataTypes) => {
  const Categorias = sequelize.define("Categorias", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    tipoCategoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeCategoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    reservaMinima: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    gastoMaximo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  });

  Categorias.associate = ({ Compras, Contratos, RendaFixa, RendaVariavel }) => {
    Categorias.belongsToMany(Compras, {
      as: "compras",
      onDelete: "cascade",
      foreignKey: "categoriaUuid",
      through: "categoriaDaCompra",
    });

    Categorias.belongsToMany(Contratos, {
      as: "contratos",
      onDelete: "cascade",
      foreignKey: "categoriaUuid",
      through: "categoriaDoContrato",
    });

    Categorias.belongsToMany(RendaFixa, {
      as: "rendafixa",
      onDelete: "cascade",
      foreignKey: "categoriaUuid",
      through: "categoriaDaRendaFixa",
    });

    Categorias.belongsToMany(RendaVariavel, {
      as: "rendavariavel",
      onDelete: "cascade",
      foreignKey: "categoriaUuid",
      through: "categoriaDaRendaVariável",
    });
  };

  return Categorias;
};
