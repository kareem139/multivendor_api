const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const user_route = require("./routes/user");
const role_route = require("./routes/role");
const shop_route = require("./routes/shop");
const category_route = require("./routes/category");
const product_route = require("./routes/product");
const brand_route = require("./routes/brand");
const cart_route = require("./routes/cartitem");
const order_route = require("./routes/order");
app.use(morgan("dev"));

// handle cors
app.use(cors());

// handle image or file upload
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//route

app.use("/user", user_route);
app.use("/role", role_route);
app.use("/shop", shop_route);
app.use("/category", category_route);
app.use("/product", product_route);
app.use("/brand", brand_route);
app.use("/cartitem", cart_route);
app.use("/order", order_route);

// handle error
app.use((req, res, next) => {
  const error = new Error("not found");
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
