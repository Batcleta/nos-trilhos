module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    nomeDoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = ({ Compras, Contratos }) => {
    Users.hasMany(Compras, {
      as: "compras",
      onDelete: "cascade",
      foreignKey: "userId",
    });

    Users.hasMany(Contratos, {
      as: "contratos",
      onDelete: "cascade",
      foreignKey: "userId",
    });
  };

  return Users;
};
