const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router
  .route("/adduser")
  .post(userController.passwordValidation, userController.createUser);
router.route("/usernames").get(userController.getJustUserNames);
router.route("/supervisor").post(userController.getSupervisor);
router.route("/:username").get(userController.getUserByUsername);
router.route("/validation").post(userController.checkUniuqeKeys);

module.exports = router;
