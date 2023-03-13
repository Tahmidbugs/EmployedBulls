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
      id: 1,
      companyName: "The Hub",
      position: "Student Assistant - Front Desk",
      hiring: 2,
      apply: "Apply Now",
      applied: false,
      shortDescription:
        "The Hub is seeking a student assistant to work the front desk...",
      location: "USF Tampa Campus",
    },
    {
      id: 2,
      companyName: "College of Engineering",
      position: "Research Assistant",
      hiring: 1,
      apply: "Apply Now",
      applied: false,
      shortDescription:
        "The College of Engineering is seeking a research assistant to join...",
      location: "USF Tampa Campus",
    },
    {
      id: 3,
      companyName: "MUMA College of Business",
      position: "Teaching Assistant",
      hiring: 3,
      apply: "Apply Now",
      applied: false,
      shortDescription:
        "The MUMA College of Business is seeking teaching assistants to help...",
      location: "USF Tampa Campus",
    },
    {
      id: 4,
      companyName: "Juniper Dining",
      position: "Student Worker - Food Service",
      hiring: 4,
      apply: "Apply Now",
      applied: false,
      shortDescription:
        "Juniper Dining is seeking student workers to help with food service...",
      location: "USF Tampa Campus",
    },
    // add more jobs here...
  ]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        // const res = await axios.get("http://localhost:8800/api/jobs/");
        // setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    }

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

      <div style={{ display: "flex", justifyContent: "center" }}>
        {filteredJobs.map((job) => (
          <JobComponent
            key={job.jobid}
            companyName={job.companyName}
            position={job.position}
            hiring={job.hiring}
            apply={job.apply}
            applied={job.applied}
            shortDescription={job.shortDescription}
          />
        ))}
      </div>
    </div>
  );
};

const JobComponent = ({
  companyName,
  position,
  hiring,
  apply,
  applied,
  shortDescription,
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
        <h2 style={{ margin: 0, fontWeight: "bold" }}>{companyName}</h2>
        <h3 style={{ margin: 0, color: "#666" }}>{position}</h3>
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
      <p style={{ margin: "10px 0" }}>{shortDescription}</p>
    </div>
  );
};

export default JobFeed;
