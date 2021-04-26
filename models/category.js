const connection = require("../sequelize/sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");
const Shop = require("./shop");

class Category extends Model {}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: connection, modelName: "category" }
);

module.exports = Category;
