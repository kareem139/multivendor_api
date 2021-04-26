const connection = require("../sequelize/sequelize");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Order = require("../models/order");
const Shop = require("../models/shop");
const Cartitem = require("../models/carditem");

Order.hasMany(Cartitem, { as: "cartitems", foreignKey: "cartitemId" });

exports._add_order = async (req, res, next) => {
  connection.sync();

  await Shop.findOne({ where: { shopId: req.body.shopId } })
    .then((shop) => {
      Cartitem.findOne({ where: { cartitemId: req.body.cartitemId } })
        .then(async (data) => {
          console.log(data.productName);
          await Order.create({
            userId: req.body.userId,
            cartitemId: req.body.cartitemId,
            payment: req.body.payment,
            status: "pinding",
            shopId: req.body.shopId,
            orderTime: Date.now.toString(),
            shopName: shop.shopName,
            deliverAddress: req.body.deliverAddress,
            userName: req.body.userName,
            productName: data.productName,
          })
            .then((o) => {
              res.status(200).json({
                o,
                message: "add success",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                message: "can not add",
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports._get_all_order = async (req, res) => {
  connection.sync();
  await Order.findAll({
    where: { userId: req.params.userId },
    include: { model: Cartitem, as: "cartitems" },
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
