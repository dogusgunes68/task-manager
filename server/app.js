const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const httpServer = require("http").createServer(app);
const session = require("express-session");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
  })
);

//Routes
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
app.use("/api/v1/tasks/", todoRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/user/", userRoutes);

httpServer.listen(2000, () => {
  console.log(`Server has started on port 2000`);
});

