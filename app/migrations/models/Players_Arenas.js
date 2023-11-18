const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Players_Arenas",
    {
      PlayerUid: {
        type: DataTypes.UUID,
      },
      ArenaUuid: {
        type: DataTypes.UUID,
      },
      locations: {
        type: DataTypes.GEOMETRY("MULTIPOINT"),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
