const connection = require("../sequelize/sequelize");
const Product = require("../models/product");
const Cartitem = require("../models/carditem");
const Order = require("../models/order");
const Shop = require("../models/shop");

Cartitem.belongsTo(Order, { as: "order", foreignKey: "orderId" });
exports._add_item = async (req, res) => {
  connection.sync();
  console.log(req.body);
  await Product.findByPk(req.body.productId)
    .then(async (data) => {
      await Cartitem.findOne({ where: { productId: data.productId } })
        .then((item) => {
          if (req.body.userId == item.userId) {
            item.quantity = item.quantity + req.body.quantity;
            item.save();
          } else {
            Shop.findOne({ where: { shopId: req.body.shopId } }).then(
              async (shop) => {
                await Cartitem.create({
                  userId: req.body.userId,
                  productId: data.productId,
                  productName: data.productName,
                  quantity: req.body.quantity,
                  unitprice: data.price,
                  shopId: shop.shopId,
                  shopName: shop.shopName,
                  orderId: 0,
                })
                  .then((item) => {
                    res.status(200).json({
                      message: "add success",
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({
                      error: err,
                      message: "can not add",
                    });
                  });
              }
            );
          }
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

exports._get_all_items = async (req, res) => {
  connection.sync();
  console.log(req.params);
  await Cartitem.findAll({ where: { userId: req.params.userId } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
