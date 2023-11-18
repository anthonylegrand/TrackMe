const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Arenas",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ownerUid: {
        type: DataTypes.STRING(128),
      },
      status: {
        type: DataTypes.ENUM(["WAITING", "INGAME", "FINISH"]),
        defaultValue: "WAITING",
        allowNull: false,
      },
      scenario: {
        type: DataTypes.ENUM(["Hide&Seek", "CTF", "Cat&Mouse"]),
        defaultValue: "Hide&Seek",
        allowNull: false,
      },
      scenarioData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      options: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      zonne: {
        type: DataTypes.GEOMETRY("POLYGON"),
        allowNull: false,
      },
      surface: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      freezeTableName: true,
    }
  );
};
