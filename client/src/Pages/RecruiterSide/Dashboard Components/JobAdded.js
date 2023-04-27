import React, { useContext, useState } from "react";
import Nav from "./Navbar";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
function JobAdded() {
  const { user, dispatch } = useContext(AuthContext);

  const [addedJobs, setAddedJobs] = React.useState([]);
  //fetch added jobs by recruiter user.email
  React.useEffect(() => {
    axios
      .get("http://localhost:8800/api/job/getJobsByRecruiter", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        setAddedJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
      }}
    >
      <Nav />

      <div
        style={{
          width: "80%",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          alignItems: "center",
        }}
      >
        <h2 style={{ alignSelf: "center" }}>Jobs you added</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            alignItems: "center",
          }}
        >
          {addedJobs.map((job) => (
            <JobCard
              key={job.jobid}
              job={job}
              addedJobs={addedJobs}
              setAddedJobs={setAddedJobs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function JobCard({ job, addedJobs, setAddedJobs }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      style={{
        display: "flex",
        transform: isHovered ? "opacity(0.5)" : "opacity(1)",
        transition: "transform 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundColor: "#252525",
          borderRadius: "10px",
          boxShadow: isHovered
            ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
            : "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
          padding: "15px",
          marginBottom: "20px",
          border: "1px solid #252525",
          color: "#D9D9D9",
          width: "50vw",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {" "}
        <h3 style={{ marginBottom: "10px" }}>{job.company_name}</h3>
        <h4 style={{ marginBottom: "10px" }}>{job.position_name}</h4>
        <p style={{ marginBottom: "10px" }}>{job.jobdescription}</p>
        <p style={{ marginBottom: "5px" }}>
          <strong style={{ color: "#FF3953" }}>Hiring:</strong> {job.hiring}
        </p>
        <p style={{ marginBottom: "5px" }}>
          <strong style={{ color: "#D9D9D9" }}>Salary:</strong> {job.salary}$/hr
        </p>
      </div>
      {/* Shows status as Pending, Shows button to withdraw */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FF3953",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
          marginBottom: "20px",
          border: "1px solid #FF3953",
          color: "#D9D9D9",
          width: "20%",
        }}
      >
        <p>Total applicants: {job.applicant_count}</p>
        <button
          style={{
            backgroundColor: "#252525",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #D9D9D9",
            color: "#D9D9D9",
            width: "100%",
            cursor: "pointer",
            opacity: "1.0",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(event) => {
            event.target.style.opacity = "0.8";
          }}
          onMouseLeave={(event) => {
            event.target.style.opacity = "1.0";
          }}
          onClick={() => {
            navigate(
              `/viewApplicants?recruiter=${job.recruiter}&position_name=${job.position_name}`
            );
          }}
        >
          View Applicants
        </button>

        <button
          style={{
            backgroundColor: "#252525",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #252525",
            color: "#D9D9D9",
            width: "100%",
            cursor: "pointer",
            opacity: "1.0",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(event) => {
            event.target.style.opacity = "0.8";
          }}
          onMouseLeave={(event) => {
            event.target.style.opacity = "1.0";
          }}
          onClick={() => {
            axios
              .delete("http://localhost:8800/api/job/deleteJob", {
                params: {
                  recruiter: job.recruiter,
                  position_name: job.position_name,
                },
              })
              .then((res) => {
                console.log(res);
                setAddedJobs(
                  addedJobs.filter((item) => item.jobid !== job.jobid)
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Remove job
        </button>
      </div>
    </div>
  );
}

export default JobAdded;
