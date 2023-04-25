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

module.exports = router;
