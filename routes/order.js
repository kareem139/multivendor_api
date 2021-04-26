const express = require("express");
const router = express.Router();
const order_controller = require("../controller/order");

router.post("/", order_controller._add_order);

module.exports = router;
