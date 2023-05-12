const express = require("express");
const app = express();
const axios = require("axios");

const { Server } = require("socket.io");
const { error } = require("console");
const httpServer = require("http").createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://192.168.1.74:3000", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("connected,", client.id);
  // client.on("update_task_state", (groupname) => {
  //   //update task state
  //   //console.log(groupname);
  //   io.emit("get_task_state", groupname);
  // });

  client.on("create_notification", () => {
    //create notification and send notification
    //console.log("crt not");
    io.emit("get_notifications");
  });
});

httpServer.listen(2001, () => {
  console.log("socket service is running on port 2001");
});
