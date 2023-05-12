const pool = require("./../db/db");
const bcrypt = require("bcryptjs");
const passwordValidator = require("password-validator");
const emailService = require("../controllers/email");

const createUser = async (req, res) => {
  const { username, email, password, role } = req.body.user;
  console.log(password);
  try {
    bcrypt
      .hash(password, 10)
      .then(async (hashedPassword) => {
        await pool.query(
          "INSERT INTO users (username,email,password,role) VALUES($1,$2,$3,$4)",
          [username, email, hashedPassword, role]
        );
      })
      .catch((err) => {
        console.log("err:", err.message);
      });

    //await emailService.sendMail("reciever_email");

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

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

const passwordValidation = (req, res, next) => {
  const { password } = req.body.user;
  // Create a schema
  var schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
  const result = schema.validate(password);
  result
    ? next()
    : res.json({
        error: true,
        errorType: "password",
        message: "Invalid password type.",
      });
};

const checkUniuqeKeys = async (req, res) => {
  const { username, email } = req.body;
  console.log("username:", username);
  try {
    const users = (await pool.query("SELECT username,email FROM users")).rows;
    console.log("users:", users);
    // res.json({
    //   status: "success",
    // });
    let obj = {
      error: false,
      errorType: "",
      message: "",
    };

    users.forEach((user) => {
      if (user.username === username) {
        obj = {
          error: true,
          errorType: "username",
          message: "This username already exist.",
        };
      } else if (user.email === email) {
        obj = {
          error: true,
          errorType: "email",
          message: "This email already exist.",
        };
      }
    });
    res.json(obj);
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

const getSupervisor = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id:", id);
    const supervisor = await pool.query("SELECT * FROM users WHERE id=$1", [
      id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        supervisor: supervisor.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getJustUserNames,
  getAllUsers,
  getUserByUsername,
  getSupervisor,
  createUser,
  checkUniuqeKeys,
  passwordValidation,
};