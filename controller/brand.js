const connection = require("../sequelize/sequelize");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Shop = require("../models/shop");
const Brand = require("../models/brand");

Brand.belongsTo(Shop, { as: "shop", foreignKey: "shopId" });

exports._add_brand = async (req, res, next) => {
  connection.sync();

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
            message: "you can not add auth failed",
          });
        } else {
          if (req.body.brandId == 0 || req.body.brandId == null) {
            Brand.create({
              brandName: req.body.brandName,
              shopId: shop.shopId,
            })
              .then((brand) => {
                res.status(200).json({
                  brand,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "can not add",
                  error: err,
                });
              });
          } else {
            Brand.findByPk(req.body.brandId).then((oldbrand) => {
              var updats = {};
              for (var key in req.body) {
                updats[key] = req.body[key];
              }
              delete updats.brandId;
              oldbrand
                .update(updats)
                .then((data) => {
                  res.status(200).json({
                    message: "update success",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: "can not update",
                    error: err,
                  });
                });
            });
          }
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports._get_all_brand_or_by_id = async (req, res, next) => {
  connection.sync();
  if (req.body.brandId == null) {
    await Brand.findAll({ include: [{ model: Shop, as: "shop" }] })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    await Brand.findOne(
      { where: { brandId: req.body.brandId } },
      { include: [{ model: Shop, as: "shop" }] }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          message: "brand not found",
        });
      });
  }
};

exports._get_brand_with_shop_id = async (req, res) => {
  connection.sync();
  await Brand.findAll({ where: { shopId: req.params.shopId } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
