const router = require("express").Router();
const taskController = require("../controllers/task");
const authController = require("../controllers/auth");

router.route("/").post(taskController.createTask);

router.route("/getgrouptasks").post(taskController.getAllTasks);
router.route("/groups").get(taskController.getAllGroups);

// router
//   .route("/rangeoftasks/:start/:end/:user_id")
//   .get(taskController.getTaskThroughoutRangeAndTasksCount);

router.route("/count").get(taskController.getTasksCount);
router.route("/update/taskstate").put(taskController.updateTaskState)

router
  .route("/:id")
  .put(taskController.updateTask)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    taskController.deleteTask
  );

module.exports = router;
