const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.route("/usernames").get(userController.getJustUserNames);
router.route("/:username").get(userController.getUserByUsername);

module.exports = router;
