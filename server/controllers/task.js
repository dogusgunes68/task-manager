const pool = require("../db/db");

const createTask = async (req, res) => {
  try {
    const { task_content, user_id, supervisor_id, task_date, deadline } =
      req.body
    const newTask = await pool.query(
      "INSERT INTO tasks (task_content,user_id,supervisor,task_date,deadline) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [task_content, user_id, supervisor_id, task_date, deadline]
    ); //return insterted object using 'RETURNING *'
    res.status(201).json({
      status: "success",
      message: [newTask.rows],
    });
  } catch (error) {
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

const getTaskThroughoutRangeAndTasksCount = async (req, res) => {
  try {
    const { start, end } = req.params;
    const tasks = await pool.query(
      "SELECT * from (select *, row_number () over (order by id) from tasks) as tbl where row_number BETWEEN $1 AND $2 order by deadline",
      [start, end]
    );
    const count = await pool.query("SELECT COUNT(*) FROM tasks");
    res.status(200).json({
      status: "success",
      result: {
        tasks: tasks.rows,
        count: count.rows,
      },
    });
  } catch (error) {
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
};
