module.exports = (sequelize, DataTypes) => {
  const Contratos = sequelize.define("Contratos", {
    inicioDoContrato: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    vencimentoDoContrato: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricaoDoContrato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valorDoContrato: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    mesesDeFidelidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusDoContrato: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    categoriaContrato: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Contratos.associate = ({ Categorias, Users, Contas }) => {
    Contratos.belongsToMany(Categorias, {
      as: "categoria",
      onDelete: "cascade",
      foreignKey: "contratoId",
      through: "categoriaDoContrato",
    });

    Contratos.belongsTo(Users, {
      as: "user",
    });

    Contratos.hasMany(Contas, {
      as: "contas",
      onDelete: "cascade",
      foreignKey: "contratoId",
    });
  };

  return Contratos;
};
