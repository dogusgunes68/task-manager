const pool = require("../db/db");

module.exports.createNotification = async () => {
  try {
    const { task_content, description, task_date, user_id } = req.body;
    console.log("body:", req.body);
    
    res.status(201).json({
      status: "success",
      data: notification.rows,
    });
  } catch (error) {
    console.log("err:", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getNotifications = async (req, res) => {
  try {
    const { userid } = req.params;
    const notification = await pool.query(
      "SELECT * FROM notifications WHERE user_id=$1",
      [userid]
    );
    res.status(200).json({
      status: "success",
      data: notification.rows,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.body;
    await pool.query("UPDATE notifications SET read = true WHERE id = $1", [
      id,
    ]);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
