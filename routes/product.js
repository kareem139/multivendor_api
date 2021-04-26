const express = require("express");
const router = express.Router();
const multer = require("multer");
const product_controller = require("../controller/product");
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

router.post(
  "/",
  upload.array("image", 3),
  AuthCheck,
  product_controller._add_product_or_edit
);

router.get("/", product_controller._get_all_product_or_by_filters);
router.delete(
  "/:userId/:shopId/:productId",
  product_controller._delete_product_with_id
);

router.get("/:productId", product_controller._get_product_by_id);

module.exports = router;
