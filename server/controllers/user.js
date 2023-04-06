const pool = require("./../db/db");

const getJustUserNames = async (req, res) => {
  try {
    const usernames = await pool.query(
      "SELECT username FROM users WHERE role = 'user'"
    );

    res.status(200).json({
      status: "success",
      data: {
        usernames: usernames.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");

    res.status(200).json({
      status: "success",
      data: {
        users: users.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        user: user.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getJustUserNames, getAllUsers, getUserByUsername };