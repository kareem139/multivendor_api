const connection = require("../sequelize/sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");

class Order extends Model {}

Order.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
    },
    orderTime: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    payment: {
      type: DataTypes.BOOLEAN,
    },
    cartitemId: {
      type: DataTypes.INTEGER,
    },
    userName: {
      type: DataTypes.STRING,
    },
    shopName: {
      type: DataTypes.STRING,
    },
    deliverAddress: {
      type: DataTypes.STRING,
    },
    shopId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: connection, modelName: "order" }
);

module.exports = Order;
