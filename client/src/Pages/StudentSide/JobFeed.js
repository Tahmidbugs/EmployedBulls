import axios from "axios";
import React, { useState, useEffect } from "react";
// import JobComponent from "../../Components/JobComponent";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const JobFeed = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const [jobs, setJobs] = useState([
    {
      jobid: 1,
      company_name: "The Hub",
      position_name: "Student Assistant - Front Desk",
      hiring: 2,
      apply: "Apply Now",
      applied: false,
      jobdescription:
        "The Hub is seeking a student assistant to work the front desk...",
      location: "USF Tampa Campus",
    },
    {
      jobid: 2,
      company_name: "College of Engineering",
      position_name: "Research Assistant",
      hiring: 1,
      apply: "Apply Now",
      applied: false,
      jobdescription:
        "The College of Engineering is seeking a research assistant to join...",
      location: "USF Tampa Campus",
    },
    {
      jobid: 3,
      company_name: "MUMA College of Business",
      position_name: "Teaching Assistant",
      hiring: 3,
      apply: "Apply Now",
      applied: false,
      jobdescription:
        "The MUMA College of Business is seeking teaching assistants to help...",
      location: "USF Tampa Campus",
    },
    {
      jobid: 4,
      company_name: "Juniper Dining",
      position_name: "Student Worker - Food Service",
      hiring: 4,
      apply: "Apply Now",
      applied: false,
      jobdescription:
        "Juniper Dining is seeking student workers to help with food service...",
      location: "USF Tampa Campus",
    },
    // add more jobs here...
  ]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/job/");
        setJobs([...jobs, ...res.data]); // add the new data to the existing array
        console.log("Successful");
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.hiring > 0);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <Navbar.Brand href="#home">Employed Bulls</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Profile</Nav.Link>
            <Nav.Link href="#link">Saved Jobs</Nav.Link>
            <Nav.Link href="#link">Application Centre</Nav.Link>
            <Nav.Link href="#link">Sign Out</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              as="select"
              onChange={handleFilterChange}
              value={filter}
              style={{ marginRight: "10px" }}
            >
              <option value="all">Display All Jobs</option>
              <option value="hiring">Display Jobs Still Hiring</option>
            </FormControl>
            <Button variant="outline-success">Filter</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {filteredJobs.map((job) => (
          <JobComponent
            key={job.jobid}
            company_name={job.company_name}
            position_name={job.position_name}
            hiring={job.hiring}
            apply={job.apply}
            applied={job.applied}
            jobdescription={job.jobdescription}
          />
        ))}
      </div>
    </div>
  );
};

const JobComponent = ({
  company_name,
  position_name,
  hiring,
  apply,
  applied,
  jobdescription,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f8f8f8",
        borderRadius: "10px",
        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "20px",
        maxWidth: "400px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontWeight: "bold" }}>{company_name}</h2>
        <h3 style={{ margin: 0, color: "#666" }}>{position_name}</h3>
      </div>
      <hr style={{ borderTop: "1px solid #ccc", margin: "10px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ margin: 0, color: "#666" }}>Hiring: {hiring} people</p>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 12px",
            fontWeight: "bold",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {apply}
        </button>
      </div>
      <hr style={{ borderTop: "1px solid #ccc", margin: "10px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ margin: 0, color: "#666" }}>Applied? {applied}</p>
      </div>
      <p style={{ margin: "10px 0" }}>{jobdescription}</p>
    </div>
  );
};

export default JobFeed;
