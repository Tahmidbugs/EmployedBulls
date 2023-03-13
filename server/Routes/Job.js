const express = require("express");
const router = express.Router();
const pool = require("./db");

router.post("/jobs", async (req, res) => {
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

router.get("/jobs", async (req, res) => {
  try {
    const allJobs = await pool.query("SELECT * FROM Job");

    res.status(200).json(allJobs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
