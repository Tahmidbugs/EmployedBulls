import React, { useContext, useState } from "react";
import Nav from "./Navbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedjobs, setAppliedJobs] = React.useState([]);
  const { user, dispatch } = useContext(AuthContext);
  //   app.get("/jobsApplied/:email"
  React.useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/jobsApplied/${user.email}`
        );
        console.log(res.data);
        setAppliedJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAppliedJobs();
  }, []);

  console.log("applied jobs: ", appliedjobs);
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Nav />
      <div
        style={{
          width: "80%",
          marginLeft: "100px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <h2>
          Applied Jobs <br />
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "column",
            marginTop: "50px",
            width: "90%",
          }}
        >
          {appliedjobs.map((job) => (
            <JobCard job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

function JobCard({ job }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      style={{
        display: "flex",
        transform: isHovered ? "scale(1.1)" : "scale(1.0)",
        transition: "transform 0.3s",
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
          width: "60%",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          toggleDrawer();
          setInfo({
            company_name: job.company_name,
            position_name: job.position_name,
            jobdescription: job.jobdescription,
            hiring: job.hiring,
            salary: job.salary,
            location: job.location,
            id: job.jobid,
            recruiter: job.recruiter,
          });
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
          width: "15%",
        }}
      >
        <h4>Status: Application submitted</h4>
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
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default AppliedJobs;
