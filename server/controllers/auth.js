const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signJwt = (id) => {
  console.log("sign id", id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 5 * 60,
  });
};

exports.signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (password.length < 6) {
    res.status(400).json({
      message: "Password length is less than 6",
    });
  }

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    const user = await new User(
      username,
      email,
      hashedPassword,
      role
    ).createUser();
    //user = user.rows[0];

    console.log("user: ", user);

    const token = signJwt(user.id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("E-mail and password required."));
  }

  const user = await User.getUserWithPassword(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new Error("User does not exist."));
  }

  console.log("user,", user);
  const token = signJwt(user.id);
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  //check if token exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //console.log(token);

  if (!token) next(new Error("You are not logged in"));

  //verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exists
  const freshUser = User.getUserById(decoded.id);
  if (!freshUser) {
    return next(
      new Error("the user belonging to this token does no longer exist")
    );
  }

  //check if user changed password after the token was issued.

  //grant access to protected route
  req.user = freshUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("Permission denied."));
    }

    next();
  };
};


