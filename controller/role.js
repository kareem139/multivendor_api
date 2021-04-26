const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const connection = require("../sequelize/sequelize");
const Role = require("../models/role");
const User = require("../models/user");

Role.hasMany(User, {
  as: "users",
  foreignKey: "roleId",
});

exports._addRole = async (req, res, next) => {
  connection.sync();
  await Role.create({
    roleName: req.body.roleName,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports._get_roles = async (req, res, next) => {
  connection.sync();
  await Role.findAll()
    .then((data) => {
      data.splice(0, 1);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
