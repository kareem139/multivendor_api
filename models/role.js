const connection = require("../sequelize/sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./user");

class Role extends Model {}

Role.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: connection, modelName: "role" }
);

module.exports = Role;
