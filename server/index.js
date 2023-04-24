const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./Routes/Auth");
const jobRoute = require("./Routes/Job");
const http = require("http").createServer(app);
const db = require("./db");
const multer = require("multer");
const upload = multer();
dotenv.config();
const FormData = require("form-data");
const axios = require("axios");

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
    console.log("reading");
    db.query(
      "SELECT * FROM chat_messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at",
      [senderId, receiverId],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          // send chat history to client
          console.log(res.rows);
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

app.post("/insert-student", async (req, res) => {
  try {
    const {
      fullName,
      studentId,
      email,
      phoneNumber,
      address,
      GPA,
      major,
      workExperience,
      resume,
      password,
    } = req.body;

    const insertQuery = `
      INSERT INTO students (
        student_id,
        full_name,
        email,
        phone_number,
        address,
        gpa,
        major,
        work_experience,
        resume,
        password
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const insertValues = [
      studentId,
      fullName,
      email,
      phoneNumber,
      address,
      GPA,
      major,
      workExperience,
      resume,
      password,
    ];
    await db.query(insertQuery, insertValues);
    console.log("Student added successfully");
    const updateQuery = `
      UPDATE users
      SET profilecomplete = true
      WHERE email = $1
    `;
    const updateValues = [email];
    await db.query(updateQuery, updateValues);
    console.log("User profile complete");

    res.status(201).send("Student added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding student");
  }
});

app.post("/uploadresume", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  if (file.mimetype !== "application/pdf") {
    return res
      .status(400)
      .json({ error: "Invalid file type. Please upload a PDF file." });
  }
  console.log(file);

  try {
    const url = `https://api.apilayer.com/resume_parser/url?url=${file.buffer}`;
    const response = await axios.get(url, {
      headers: {
        apikey: "Kmph8W64mcq1jVP9OvLdODWifuVAZI4H",
      },
    });
    const data = response.data;
    // do something with the parsed data
    console.log(data);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//twilio config

const port = process.env.PORT || 8800;

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
