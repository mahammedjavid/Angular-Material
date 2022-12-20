const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        maxLength: 50,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        maxLength: 50,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        maxLength: 50,
      },
      phoneno: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        maxLength: 50,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
