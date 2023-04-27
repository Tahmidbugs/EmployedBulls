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

router.get("/getStudentInfo", async (req, res) => {
  const { email } = req.query;
  console.log("getting student", email);
  try {
    const student = await db.query("SELECT * FROM students WHERE email = $1", [
      email,
    ]);
    res.status(200).json(student.rows);
    console.log(student.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/getStudentJobs", async (req, res) => {
  const { email } = req.query;
  console.log("getting student jobs", email);
  try {
    const student = await db.query(
      "SELECT * from job NATURAL JOIN (SELECT recruiter, position_name FROM applications WHERE student_id = $1) AS a",
      [email]
    );
    res.status(200).json(student.rows);
    console.log(student.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/getAllCompanies", async (req, res) => {
  console.log("getting all companies");
  try {
    const companies = await db.query("SELECT * FROM companies");
    res.status(200).json(companies.rows);
    console.log(companies.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
