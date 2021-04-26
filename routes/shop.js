const express = require("express");
const router = express.Router();
const multer = require("multer");
const shop_controller = require("../controller/shop");
const AuthCheck = require("../middleware/authcheck");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// add or edit
router.post(
  "/",
  upload.array("image", 3),
  AuthCheck,
  shop_controller._add_shop
);

// get all or by id
router.get("/", shop_controller._get_all_shop_or_by_id);

// delete

router.delete("/", AuthCheck, shop_controller._delete_shop_by_id);

router.get("/getmyshop/:userId", shop_controller._get_shop_by_userId);
router.get("/:shopId", shop_controller._get_shop_by_shopId);

module.exports = router;
