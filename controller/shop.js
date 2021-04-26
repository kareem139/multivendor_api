const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const connection = require("../sequelize/sequelize");
const Shop = require("../models/shop");
const User = require("../models/user");
const Role = require("../models/role");
const Category = require("../models/category");
const Brand = require("../models/brand");
const Product = require("../models/product");

Shop.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
Shop.hasMany(Category, { as: "categories", foreignKey: "shopId" });
Shop.hasMany(Brand, { as: "brands", foreignKey: "shopId" });
Shop.hasMany(Product, { as: "products", foreignKey: "shopId" });

exports._add_shop = async (req, res, next) => {
  connection.sync();
  console.log(req.body);
  console.log(req.files);
  // get user data
  await User.findByPk(req.body.userId)
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "auth failed ",
        });
      }
      if (user) {
        // check for role
        Role.findByPk(user.roleId).then((role) => {
          if (role.roleName == "Vendor" || role.roleName == "superAdmin") {
            // check of shopId===> add
            if (req.body.shopId == 0 || req.body.shopId == null) {
              Shop.create({
                shopName: req.body.shopName,
                ownerId: user.userId,
                ownerName: user.name,
                imageUrl1: req.files[0].path,
                imageUrl2: req.files[1].path,
                imageUrl3: req.files[2].path,
                email: req.body.email,
                address: req.body.address,
                phoneNum: req.body.phoneNum,
              })
                .then((shop) => {
                  res.status(200).json(shop);
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,

                    message: "ojmojmo",
                  });
                });
            } else {
              // edit

              Shop.findByPk(req.body.shopId)
                .then((oldshop) => {
                  var updats = {};

                  for (var key in req.body) {
                    updats[key] = req.body[key];
                  }
                  oldshop.update(updats);
                  res.status(200).json({
                    message: "update success",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: "can not update",
                  });
                });
            }
          } else {
            res.status(401).json({
              message: "auth failed ",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(401).json({
        message: "auth failed",
      });
    });
};

exports._get_all_shop_or_by_id = async (req, res, next) => {
  connection.sync();
  console.log(req.body);
  // get by id

  if (req.body.shopId != null) {
    await Shop.findOne({
      where: { shopId: req.body.shopId },
      include: [
        { model: User, as: "owner" },
        { model: Category, as: "categories" },
        { model: Brand, as: "brands" },
      ],
    })
      .then((shop) => {
        res.status(200).json(shop);
      })
      .catch((err) => {
        res.status(404).json({
          message: "shop not found",
        });
      });
  } else {
    // get all

    await Shop.findAll({ include: [{ model: User, as: "owner" }] })
      .then((shops) => {
        res.status(200).json(shops);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports._delete_shop_by_id = async (req, res, next) => {
  connection.sync();

  // check if exist
  await Shop.findByPk(req.body.shopId)
    .then((shop) => {
      if (!shop) {
        res.status(404).json({
          message: "shop not found",
        });
      } else {
        // check for owner auth
        if (shop.ownerId == req.body.ownerId) {
          Shop.destroy({ where: { shopId: shop.shopId } })
            .then((done) => {
              res.status(200).json({
                message: "shop delete success",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                message: "can not delete",
              });
            });
        } else {
          res.status(404).json({
            message: "you have not access",
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports._get_shop_by_userId = async (req, res, next) => {
  connection.sync();
  console.log(req.params.userId);
  await Shop.findAll({ where: { ownerId: req.params.userId } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports._get_shop_by_shopId = async (req, res) => {
  connection.sync();
  await Shop.findOne({
    where: { shopId: req.params.shopId },
    include: [
      { model: User, as: "owner" },
      { model: Category, as: "categories" },
      { model: Brand, as: "brands" },
      { model: Product, as: "products" },
    ],
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
