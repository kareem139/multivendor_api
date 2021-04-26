const connection = require("../sequelize/sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");
const Category = require("./category");
const Brand = require("./brand");

class Product extends Model {}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    productName: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.DOUBLE,
    },

    stock: {
      type: DataTypes.INTEGER,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
    },
    shopId: {
      type: DataTypes.INTEGER,
    },

    shopName: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    categoryName: {
      type: DataTypes.STRING,
    },

    brandId: {
      type: DataTypes.INTEGER,
    },
    brandName: {
      type: DataTypes.STRING,
    },
    imageUrl1: {
      type: DataTypes.STRING,
    },
    imageUrl2: {
      type: DataTypes.STRING,
    },
    imageUrl3: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: connection, modelName: "product" }
);

module.exports = Product;
