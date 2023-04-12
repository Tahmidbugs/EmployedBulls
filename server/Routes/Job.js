const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const {
      company_name,
      position_name,
      job_description,
      recruiter_id,
      applied_student,
    } = req.body;

    const newJob = await pool.query(
      "INSERT INTO Job (Company_Name, Position_Name, JobDescription, Recruiter_ID, Applied_Student) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        company_name,
        position_name,
        job_description,
        recruiter_id,
        applied_student,
      ]
    );

    res.status(201).json(newJob.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  console.log("getting all jobs");
  try {
    const allJobs = await db.query("SELECT * FROM job");
    res.status(200).json(allJobs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
