require("dotenv").config();
const socketIo = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

require("./app/migrations/");
require("./app/routes")(app);
require("./app/sockets")(io);

server.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Express server is running on port ${process.env.EXPRESS_PORT}.`);
});
