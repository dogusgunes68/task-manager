const pool = require("../db/db");
const dotenv = require("dotenv");
dotenv.config();

class User {
  constructor(username, email, password, role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async getUserWithPassword(email) {
    const user = await pool.query("SELECT * FROM users WHERE email=($1)", [
      email,
    ]);
    return user.rows[0];
  }

  static async getUserById(id) {
    const user = await pool.query("SELECT * FROM users WHERE id=($1)", [id]);
    return user;
  }

  async createUser() {
    const user = await pool.query(
      "INSERT INTO users (username,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
      [this.username, this.email, this.password, this.role]
    );

    return user.rows[0];
  }

  deleteUser() {}
}

module.exports = User;
