const express = require("express");
const router = express.Router();
const cart_controller = require("../controller/cartitem");
const AuthCheck = require("../middleware/authcheck");

router.post("/", cart_controller._add_item);

router.get("/:userId", cart_controller._get_all_items);

module.exports = router;
