const connection = require("../sequelize/sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");
const multer = require("multer");

class CartItem extends Model {}

CartItem.init(
  {
    cartitemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unitprice: {
      type: DataTypes.DOUBLE,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    shopId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
    },
    shopName: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: connection, modelName: "cartitem" }
);

module.exports = CartItem;
