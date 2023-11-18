const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Players",
    {
      uid: {
        type: DataTypes.STRING(128),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      pseudo: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};
