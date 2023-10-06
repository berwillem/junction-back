const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const connectDB = require("./config/db");
const { handleSocketConnections } = require("./controllers/socketController");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const routes = require("./routes/index");
app.use(routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
handleSocketConnections(io);

connectDB()
  .then(() => {
    console.log("Database connected");

    server.listen(process.env.PORT, () => {
      console.log(
        `Express server is running on port ${process.env.PORT} in ${app.get(
          "env"
        )}`
      );
    });

    io.on("connection", (socket) => {
      console.log(`user Conected: ${socket.id}`);
    });
  })
  .catch((err) => console.error("Failed to connect to database", err));

module.exports = app;

// socket.on("send_message", (data) => {
//   socket.broadcast.emit("receive_message", data);
// });
