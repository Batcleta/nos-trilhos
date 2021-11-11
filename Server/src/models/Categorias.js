module.exports = (sequelize, DataTypes) => {
  const Categorias = sequelize.define("Categorias", {
    tipoCategoria: {
      type: DataTypes.INTEGER,
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
  });

  Categorias.associate = ({ Compras, Contratos, RendaFixa, RendaVariavel }) => {
    Categorias.belongsToMany(Compras, {
      as: "compras",
      onDelete: "cascade",
      foreignKey: "categoriaId",
      through: "categoriaDaCompra",
    });

    Categorias.belongsToMany(Contratos, {
      as: "contratos",
      onDelete: "cascade",
      foreignKey: "categoriaId",
      through: "categoriaDoContrato",
    });

    Categorias.belongsToMany(RendaFixa, {
      as: "rendafixa",
      onDelete: "cascade",
      foreignKey: "categoriaId",
      through: "categoriaDaRendaFixa",
    });

    Categorias.belongsToMany(RendaVariavel, {
      as: "rendavariavel",
      onDelete: "cascade",
      foreignKey: "categoriaId",
      through: "categoriaDaRendaFixa",
    });
  };

  return Categorias;
};
