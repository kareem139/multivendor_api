const express = require("express");
const router = express.Router();
const Role_controller = require("../controller/role");
const AuthCheck = require("../middleware/authcheck");

router.post("/", AuthCheck, Role_controller._addRole);

router.get("/", Role_controller._get_roles);

module.exports = router;
