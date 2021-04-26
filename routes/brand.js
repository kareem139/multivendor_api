const express = require("express");
const router = express.Router();
const brand_controller = require("../controller/brand");
const AuthCheck = require("../middleware/authcheck");

router.post("/", AuthCheck, brand_controller._add_brand);
router.get("/", brand_controller._get_all_brand_or_by_id);
router.get("/:shopId", brand_controller._get_brand_with_shop_id);

module.exports = router;
