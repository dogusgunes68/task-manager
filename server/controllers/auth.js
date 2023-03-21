const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "Ssdalwd574sadasdwqwesdfgeokioj";

exports.register = async (req, res, next) => {
  const { username, password, role } = req.body;
  if (password.length < 6) {
    res.status(400).json({
      message: "Password length is less than 6",
    });
  }
  try {
    bcrypt
      .hash(password, 10)
      .then(async (hashedPassword) => {
        await pool
          .query(
            "INSERT INTO users (username,password,role) VALUES($1,$2,$3) RETURNING *",
            [username, hashedPassword, role]
          )
          .then((user) => {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(user, secretKey, {
              expiresIn: maxAge, // 3hrs in sec
            });
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(200).json({
              message: "User successfully created",
              user,
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          status: "Password could not hash",
          error: err.mesage,
        });
      });
  } catch (err) {
    res.status(401).json({
      message: "User not created",
      error: err.mesage,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE username=$1, password=$2",
      [username, password]
    );
    if (!user) {
      res.status.json({
        message: "Login is not successfull",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        result
          ? res.status(200).json({
              message: "Login successful",
              user,
            })
          : res.status(400).json({
              mesage: "Login not successful, password incorrect",
            });
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.mesage,
    });
  }
};
