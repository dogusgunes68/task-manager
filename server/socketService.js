const express = require("express");
const app = express();

const { Server } = require("socket.io");
const httpServer = require("http").createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("connected,", client.id);
  client.on("update_task_state", (groupname) => {
    //update task state
    //console.log(groupname);
    io.emit("get_task_state", groupname);
  });
});

httpServer.listen(2001, () => {
  console.log("socket service is running on port 2001");
});
