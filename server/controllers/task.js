const pool = require("../db/db");
const User = require("./../models/User");
const notification = require("./notification");

const createTask = async (req, res) => {
  try {
    const {
      task_content,
      description,
      modulename,
      user_id,
      supervisor,
      task_date,
      deadline,
    } = req.body;
    const newItem = await pool.query(
      "INSERT INTO workflow (task_content,description,modulename,user_id,supervisor,task_date,deadline) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        task_content,
        description,
        modulename,
        user_id,
        supervisor,
        task_date,
        deadline,
      ]
    );
    const notification = await pool.query(
      "INSERT INTO notifications(title,content,date,user_id) VALUES($1,$2,$3,$4)",
      [task_content, description, task_date, user_id]
    );

    res.status(201).json({
      status: "success",
      message: [newItem.rows],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await pool.query("SELECT * FROM groups");
    res.status(200).json({
      data: groups.rows,
    });
  } catch (error) {}
};

const getAllTasks = async (req, res) => {
  try {
    const groupid = req.body.groupid;
    console.log(groupid);
    const workflow = await pool.query(
      "SELECT * FROM workflow WHERE status = 1 and groupid=$1",
      [groupid]
      //"SELECT workflow.*,groups.name as groupname FROM workflow right outer JOIN groups ON workflow.groupid = groups.id WHERE status = 1 or status is null;      "
    );

    res.status(200).json({
      status: "success",
      data: workflow.rows,
    });
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
};

async function getUserIdByUsername(username) {
  //console.log(groupid);
  const id = await pool.query(
    "SELECT id FROM users WHERE username=$1",
    [username]
    //"SELECT workflow.*,groups.name as groupname FROM workflow right outer JOIN groups ON workflow.groupid = groups.id WHERE status = 1 or status is null;      "
  );

  return id.rows[0].id;
}

async function getTasksByUser(req, res) {
  try {
    const { groupid, username } = req.body;
    const user_id = await getUserIdByUsername(username);
    console.log("id:", user_id);
    const workflow = await pool.query(
      "SELECT * FROM workflow WHERE status = 1 and groupid=$1 and user_id=$2",
      [groupid, user_id]
      //"SELECT workflow.*,groups.name as groupname FROM workflow right outer JOIN groups ON workflow.groupid = groups.id WHERE status = 1 or status is null;      "
    );

    res.status(200).json({
      status: "success",
      data: workflow.rows,
    });
  } catch (error) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
}

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM workflow WHERE id=($1)", [id]);
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
      "UPDATE workflow SET task_content = $1 WHERE id = $2",
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
    const { id, groupid } = req.body;

    const updatedTask = await pool.query(
      "UPDATE workflow SET groupid=$1 WHERE id=$2 RETURNING *",
      [groupid, id]
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
      "SELECT * from (select *, row_number() over (order by deadline) from workflow where condition = $3) as tbl where row_number BETWEEN $1 AND $2  order by deadline";

    const user = await User.getUserById(user_id);
    console.log(user.rows[0].role);
    user.rows[0].role === "user"
      ? (query = query.replace("condition", "user_id"))
      : (query = query.replace("condition", "supervisor"));

    const tasks = await pool.query(query, [start, end, user_id]);

    var query2 = "SELECT COUNT(*) FROM workflow WHERE condition = $1";
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
    const count = await pool.query("SELECT COUNT(*) FROM workflow");
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
  getAllGroups,
  getTasksByUser,
};
