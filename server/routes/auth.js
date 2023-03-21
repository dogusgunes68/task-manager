const router = require("express").Router();
const authController = require("../controllers/auth");

router.route("/register").get(authController.register);

module.exports = router;
