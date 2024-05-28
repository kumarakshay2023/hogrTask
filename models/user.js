const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      index: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coins: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      }
  },
  {
    created_at: true,
    updated_at: true,
    tableName: "user",
  }
);

module.exports = User;
