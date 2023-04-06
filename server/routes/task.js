const router = require("express").Router();
const taskController = require("../controllers/task");
const authController = require("../controllers/auth");

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router
  .route("/rangeoftasks/:start/:end/:user_id")
  .get(taskController.getTaskThroughoutRangeAndTasksCount);

router.route("/count").get(taskController.getTasksCount);

router
  .route("/:id")
  .put(taskController.updateTask)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    taskController.deleteTask
  );

module.exports = router;
