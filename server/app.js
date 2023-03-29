const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const httpServer = require("http").createServer(app);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
app.use("/api/v1/tasks/", todoRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/user/", userRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("connected,", client.id);
  client.on("disconnect", () => console.log("disconnected"));
  client.on("data_inserted", (data) => {
    //console.log(data);
    io.emit("reload_page", data); // send data to all clients which is connected.
    //client.emit("reload_page", data); //send data to all clients without sender client in the channel.
  });
});

httpServer.listen(2000, () => {
  console.log(`Server has started on port 2000`);
});
