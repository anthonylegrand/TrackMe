module.exports = (sequelize) => {
  const { Players, Arenas, Players_Arenas } = sequelize.models;

  Players.belongsToMany(Arenas, {
    through: Players_Arenas,
  });

  Arenas.belongsToMany(Players, {
    through: Players_Arenas,
  });
};
