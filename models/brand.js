const connection = require("../sequelize/sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");

class Brand extends Model {}

Brand.init(
  {
    brandId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    brandName: {
      type: DataTypes.STRING,
    },
    shopId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: connection, modelName: "brand" }
);

module.exports = Brand;
