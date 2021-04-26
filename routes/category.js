const express = require("express");
const router = express.Router();
const category_controller = require("../controller/category");
const AuthCheck = require("../middleware/authcheck");

router.post("/", AuthCheck, category_controller._add_category);
router.get("/", category_controller._get_all_category);
router.get("/:shopId", category_controller._get_category_with_shop_id);

module.exports = router;
