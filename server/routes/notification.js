const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification");

router
  .route("/")
  .post(notificationController.createNotification)
  .put(notificationController.updateNotificationStatus);

router.route("/:userid").get(notificationController.getNotifications);

module.exports = router;
