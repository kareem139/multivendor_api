const connection = require("../sequelize/sequelize");
const User = require("./user");

const { Sequelize, Model, DataTypes } = require("sequelize");

class Shop extends Model {}

Shop.init(
  {
    shopId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ownerId: {
      type: DataTypes.STRING,
    },
    phoneNum: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        is: {
          msg: "invalid email",
        },
      },
    },
    ownerName: {
      type: DataTypes.STRING,
    },
    address: {
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
  { sequelize: connection, modelName: "shop" }
);
module.exports = Shop;

// module.exports = (Sequelize, DataTypes) => {
//   const Shop = connection.define("shop", {
//     shopId: {
//       type: DataTypes.RANGE(5),
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     shopName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     ownerName: {
//       type: DataTypes.STRING,
//       references: {
//         model: User,
//         key: "id",
//       },
//     },
//   });

//   Shop.associations;

//   return Shop;
// };
