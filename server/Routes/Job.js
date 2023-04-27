const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/addJob", async (req, res) => {
  try {
    const {
      company_name,
      position_name,
      job_description,
      salary,
      hiring,
      recruiter,
    } = req.body;

    const newJob = await db.query(
      "INSERT INTO job (company_name, position_name, jobdescription, salary, hiring, recruiter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [company_name, position_name, job_description, salary, hiring, recruiter]
    );

    res.status(201).json(newJob.rows[0]);
  } catch (err) {
    if (err.message.includes("violates check constraint")) {
      res
        .status(400)
        .json({ error: "Salary cannot be lower than state minimum wage" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
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

//  axios
// .get('http://localhost:8800/api/job/getJobsByRecruiter', {
//   params: {
//     email: user.email,
//   },
// })
// .then((res) => {
//   setAddedJobs(res.data);
// })
// .catch((err) => {
//   console.log(err);
// });

router.get("/getJobsByRecruiter", async (req, res) => {
  const { email } = req.query;
  console.log("getting all jobs by recruiter", email);
  try {
    const allJobs = await db.query("SELECT * FROM job WHERE recruiter = $1", [
      email,
    ]);
    console.log(allJobs.rows);
    res.status(200).json(allJobs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/deleteJob", async (req, res) => {
  try {
    const { recruiter, position_name } = req.query;
    const deletedJob = await db.query(
      "DELETE FROM job WHERE recruiter=$1 AND position_name=$2 RETURNING *",
      [recruiter, position_name]
    );
    if (deletedJob.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    console.log("deleted job", deletedJob.rows[0]);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/applicants", async (req, res) => {
  const { recruiter, position_name } = req.query;

  try {
    const applicants = await db.query(
      `
      SELECT s.*
      FROM student_applicants s
      INNER JOIN applications a ON s.email = a.student_id
      WHERE a.recruiter = $1 AND a.position_name = $2;
    `,
      [recruiter, position_name]
    );

    res.json(applicants.rows);
    console.log(applicants.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
