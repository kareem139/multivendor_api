const connection = require("../sequelize/sequelize");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Product = require("../models/product");

Category.belongsTo(Shop, { as: "shop", foreignKey: "shopId" });
Category.hasMany(Product, { as: "products", foreignKey: "categoryId" });

exports._add_category = async (req, res, next) => {
  connection.sync();

  console.log("-------------------------------");
  console.log(req.body);
  console.log("-------------------------------");
  await Shop.findByPk(req.body.shopId)
    .then((shop) => {
      if (!shop) {
        res.status(404).json({
          message: "shop not found",
        });
      }

      if (shop) {
        if (shop.ownerId != req.body.userId) {
          res.status(401).json({
            message: " you can not add category auth failed",
          });
        } else {
          Category.create({
            categoryName: req.body.categoryName,
            shopId: shop.shopId,
          })
            .then((cat) => {
              res.status(200).json(cat);
            })
            .catch((err) => {
              res.status(500).json({
                message: "can not add an error",
                error: err,
              });
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

exports._get_all_category = async (req, res, next) => {
  connection.sync();
  await Category.findAll({ include: [{ model: Shop, as: "shop" }] })
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports._get_category_with_shop_id = async (req, res) => {
  connection.sync();
  await Category.findAll({ where: { shopId: req.params.shopId } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
