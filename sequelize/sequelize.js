const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = new Sequelize("multivendordb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
