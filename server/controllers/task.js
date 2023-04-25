const pool = require("../db/db");
const User = require("./../models/User");

const createTask = async (req, res) => {
  try {
    const { task_content, user_id, supervisor, task_date, deadline } = req.body;

    const newTask = await pool.query(
      //new table name will be WORKFLOW.
      //table properties must be change.
      "INSERT INTO tasks (task_content,user_id,supervisor,task_date,deadline) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [task_content, user_id, supervisor, task_date, deadline]
    ); //return insterted object using 'RETURNING *'
    res.status(201).json({
      status: "success",
      message: [newTask.rows],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await pool.query("SELECT * FROM tasks");
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM tasks WHERE id=($1)", [id]);
    res.status(200).json({
      status: "success",
      message: "deleted",
    });
  } catch (error) {
    res.status(200).json({
      error: `${error.message}`,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { task_content } = req.body;
    const id = req.params.id;
    const updatedTask = await pool.query(
      "UPDATE tasks SET task_content = $1 WHERE id = $2",
      [task_content, id]
    );
    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
};

const updateTaskState = async (req, res) => {
  try {
    const { id, task_state } = req.body;
    console.log("id:", id, " state:", task_state);
    const updatedTask = await pool.query(
      "UPDATE tasks SET task_state=$1 WHERE id=$2 RETURNING *",
      [task_state, id]
    );

    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
};

const getTaskThroughoutRangeAndTasksCount = async (req, res) => {
  try {
    const { start, end, user_id } = req.params;
    var query =
      "SELECT * from (select *, row_number() over (order by deadline) from tasks where condition = $3) as tbl where row_number BETWEEN $1 AND $2  order by deadline";

    const user = await User.getUserById(user_id);
    console.log(user.rows[0].role);
    user.rows[0].role === "user"
      ? (query = query.replace("condition", "user_id"))
      : (query = query.replace("condition", "supervisor"));

    const tasks = await pool.query(query, [start, end, user_id]);

    var query2 = "SELECT COUNT(*) FROM tasks WHERE condition = $1";
    user.rows[0].role === "user"
      ? (query2 = query2.replace("condition", "user_id"))
      : (query2 = query2.replace("condition", "supervisor"));
    const count = await pool.query(query2, [user_id]);
    console.log("query:", query2);

    console.log("cnt:", count);
    res.status(200).json({
      status: "success",
      result: {
        tasks: tasks.rows,
        count: count.rows,
      },
    });
  } catch (error) {
    console.log("err", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTasksCount = async (req, res) => {
  try {
    const count = await pool.query("SELECT COUNT(*) FROM tasks");
    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  getTaskThroughoutRangeAndTasksCount,
  getTasksCount,
  updateTaskState,
};
