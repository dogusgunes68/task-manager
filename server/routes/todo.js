const router = require("express").Router();
const todoController = require("../controllers/todo");

router.route('/').get(todoController.getAllTodos).post(todoController.createTodo);
router.route('/:todo_id').put(todoController.updateTodo).delete(todoController.deleteTodo);

module.exports = router;