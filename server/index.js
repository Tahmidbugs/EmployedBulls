const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./Routes/Auth");

dotenv.config();

//middlewares
app.use(express.json());

// cors config-- allows backend frontend communication
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/api/auth", authRoute);

//twilio config

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
