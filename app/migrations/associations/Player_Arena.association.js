module.exports = (sequelize) => {
  const { Players, Arenas } = sequelize.models;

  Players.hasMany(Arenas, {
    foreignKey: {
      name: "ownerUid",
      allowNull: false,
    },
    sourceKey: "uid",
    as: "ownedArena",
  });

  Arenas.belongsTo(Players, {
    foreignKey: {
      name: "ownerUid",
      allowNull: false,
    },
  });
};
