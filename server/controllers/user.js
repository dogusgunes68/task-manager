const pool = require("./../db/db");

const getJustUserNames = async (req, res) => {
  try {
    const usernames = await pool.query("SELECT username FROM users");

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

module.exports = { getJustUserNames };
