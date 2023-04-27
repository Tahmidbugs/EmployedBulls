const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/getStudent", async (req, res) => {
  const { email } = req.query;
  console.log("getting student", email);
  try {
    const student = await db.query(
      "SELECT * FROM student_applicants WHERE email = $1",
      [email]
    );
    res.status(200).json(student.rows);
    console.log(student.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
