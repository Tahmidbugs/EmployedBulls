const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./Routes/Auth");
const jobRoute = require("./Routes/Job");
const http = require("http").createServer(app);
const db = require("./db");

dotenv.config();

//middlewares
app.use(express.json());

// cors config-- allows backend frontend communication
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
    credentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
);

const io = require("socket.io")(http, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  // retrieve chat history from PostgreSQL database
  socket.on("get_chat_history", ({ senderId, receiverId }) => {
    db.query(
      "SELECT * FROM chat_messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at",
      [senderId, receiverId],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          // send chat history to client
          socket.emit("chat_history", res.rows);
        }
      }
    );
  });

  socket.on("message", ({ senderId, receiverId, message }) => {
    console.log("Received message:", message);

    // store message in PostgreSQL database
    db.query(
      "INSERT INTO chat_messages (sender_id, receiver_id, message) VALUES ($1, $2, $3)",
      [senderId, receiverId, message],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          // send message to all clients
          io.emit("message", { senderId, receiverId, message });
        }
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// use routes
app.use("/api/auth", authRoute);
app.use("/api/job", jobRoute);

//twilio config

const port = process.env.PORT || 8800;

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
