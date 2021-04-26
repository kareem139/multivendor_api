const { Sequelize, Model, DataTypes } = require("sequelize");
const connection = require("../sequelize/sequelize");
const Role = require("./role");
const Shop = require("./shop");

class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        is: {
          msg: "in correct email",
        },
      },
    },
    phoneNum: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    payment: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        is: {
          msg: "please select correct date",
        },
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
    },

    roleId: {
      type: DataTypes.INTEGER,
    },

    roleName: {
      type: DataTypes.STRING,
    },
  },

  { sequelize: connection, modelName: "user" }
);

module.exports = User;
