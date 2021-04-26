const express = require("express");
const router = express.Router();
const multer = require("multer");
const user_controller = require("../controller/user");
const authcheck = require("../middleware/authcheck");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/signup", upload.single("image"), user_controller._signup);
// router.get("/", user_controller._getusers);

router.post("/signin", user_controller._login);

router.post("/edit", authcheck, user_controller._edit_profile);
router.get("/confirm_email", user_controller._confirm_email);
router.get("/userdata/:userId", user_controller._get_userdata);
module.exports = router;
