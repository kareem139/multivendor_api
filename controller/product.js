const connection = require("../sequelize/sequelize");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Brand = require("../models/brand");
const Product = require("../models/product");

Product.belongsTo(Category, { as: "category", foreignKey: "categoryId" });
Product.belongsTo(Shop, { as: "shop", foreignKey: "shopId" });

exports._add_product_or_edit = async (req, res, next) => {
  connection.sync();

  // get shop
  await Shop.findOne({ where: { shopId: req.body.shopId } })
    .then(async (shop) => {
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
          // get category
          Category.findOne({ where: { categoryId: req.body.categoryId } })
            .then(async (cat) => {
              if (!cat) {
                res.status(404).json({
                  message: "category not found",
                });
              } else {
                // get brand
                Brand.findOne({ where: { brandId: req.body.brandId } })
                  .then(async (brand) => {
                    if (!brand) {
                      res.status(404).json({
                        message: "brand not found",
                      });
                    } else {
                      // check for productId ===> add
                      if (
                        req.body.productId == 0 ||
                        req.body.productId == null
                      ) {
                        Product.create({
                          productName: req.body.productName,
                          price: req.body.price,
                          description: req.body.description,
                          stock: req.body.stock,
                          isActive: req.body.isActive,
                          imageUrl1: req.files[0].path,
                          imageUrl2: req.files[1].path,
                          imageUrl3: req.files[2].path,
                          shopId: req.body.shopId,
                          shopName: await shop.shopName,
                          categoryId: req.body.categoryId,
                          categoryName: await cat.categoryName,
                          brandId: req.body.brandId,
                          brandName: await brand.brandName,
                        })
                          .then((result) => {
                            res.status(200).json(result);
                          })
                          .catch((err) => {
                            res.status(500).json({
                              error: err,
                              message: "1",
                            });
                          });
                      } else {
                        // edit
                        Product.findByPk(req.body.productId).then(
                          (oldproduct) => {
                            var updats = {};
                            for (var key in req.body) {
                              updats[key] = req.body[key];
                            }
                            delete updats.productId;

                            oldproduct
                              .update(updats)
                              .then((data) => {
                                res.status(200).json({
                                  message: "update success",
                                  data,
                                });
                              })
                              .catch((err) => {
                                res.status(500).json({
                                  message: "can not update",
                                  error: err,
                                });
                              });
                          }
                        );
                      }
                    }
                  })
                  .catch((err) => {
                    res.status(500).json({
                      error: err,
                      message: "2",
                    });
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                message: "3",
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,

        message: "4",
      });
    });
};

exports._delete_product_with_id = async (req, res, next) => {
  connection.sync();
  console.log(req.params);
  await Shop.findByPk(req.params.shopId)
    .then((shop) => {
      if (!shop) {
        res.status(404).json({
          message: "please enter shopId",
        });
      } else {
        if (req.params.userId != shop.ownerId) {
          res.status(401).json({
            message: "you can not delete auth faild",
          });
        } else {
          Product.destroy({ where: { productId: req.params.productId } })
            .then((data) => {
              res.status(200).json({
                message: "delete success",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: "fuckkkkkkkkkkkkkkkkkkkk",
      });
    });
};

exports._get_all_product_or_by_filters = async (req, res, next) => {
  connection.sync();
  if (req.body == null) {
    await Product.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    var filters = {};
    for (var key in req.body) {
      filters[key] = req.body[key];
    }

    await Product.findAll({ where: filters })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports._get_product_by_id = async (req, res) => {
  connection.sync();
  await Product.findOne({ where: { productId: req.params.productId } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
