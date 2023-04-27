import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// import JobComponent from "../../Components/JobComponent";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Nav from "./Navbar";
import { Container } from "reactstrap";
import { AuthContext } from "../../Context/AuthContext";

const ExploreJobs = () => {
  const [filter, setFilter] = useState("all");
  const [selectedfilterOptions, setfilterOptions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [search, setSearch] = useState("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const [jobs, setJobs] = useState([
    // add more jobs here...
  ]);
  console.log("jobs: ", jobs);
  const { user, dispatch } = useContext(AuthContext);

  const filterOptions = ["Salary", "Time Posted", "Job Type", "All Titles"];
  const handlefilterOptionClick = (filterOption) => {
    setfilterOptions((selectedfilterOptions) => {
      if (selectedfilterOptions.includes(filterOption)) {
        return selectedfilterOptions.filter((i) => i !== filterOption);
      } else {
        return [...selectedfilterOptions, filterOption];
      }
    });
  };
  const filteredJob = jobs
    .filter((job) =>
      selectedfilterOptions.includes("All Titles")
        ? true
        : selectedfilterOptions.includes(job.title)
    )
    .filter((job) =>
      selectedfilterOptions.includes("All Types")
        ? true
        : selectedfilterOptions.includes(job.type)
    )
    .sort((a, b) => {
      if (
        selectedfilterOptions.includes("salary(highest to lowest)") &&
        a.salary !== b.salary
      ) {
        return selectedfilterOptions.includes("salary(highest to lowest)")
          ? b.salary - a.salary
          : a.salary - b.salary;
      }
      if (selectedfilterOptions.includes("Time Posted")) {
        // Implement the logic for sorting by time posted
        // using handleTimePostedFilter function
      }
      return 0;
    });

  // Function to filter by all titles
  const handleAllTitlesFilter = (selectedTitle) => {
    setSelectedTitle(selectedTitle);
    filteredJobs(
      jobs.filter(
        (job) => job.title === selectedTitle || selectedTitle === "All Titles"
      )
    );
  };

  // Function to filter by job type
  const handleJobTypeFilter = (selectedType) => {
    setSelectedType(selectedType);
    filteredJobs(
      jobs.filter(
        (job) => job.type === selectedType || selectedType === "All Types"
      )
    );
  };

  // Function to filter by salary
  const handleSalaryFilter = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    if (selectedOrder === "Low to High") {
      filteredJobs(jobs.sort((a, b) => a.salary - b.salary));
    } else if (selectedOrder === "High to Low") {
      filteredJobs(jobs.sort((a, b) => b.salary - a.salary));
    } else {
      filteredJobs(jobs);
    }
  };

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

  function handleTimePostedFilter(value) {
    // Handle the time posted filter based on the selected value
    console.log(`Selected time posted filter: ${value}`);
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
        backgroundColor: "#D9D9D9 ",
      }}
    >
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
          Explore on campus jobs <br />
        </h2>

        <div style={{ display: "flex", alignItems: "center", width: "40%" }}>
          {filterOptions.map((filterOption) => (
            <div key={filterOption}>
              <button
                style={{
                  margin: "5px",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  cursor: "pointer",
                }}
                className={`choice-button ${
                  filterOptions.includes(filterOption) ? "selected" : ""
                }`}
                onClick={() => handlefilterOptionClick(filterOption)}
              >
                {filterOption}
                {/* Render dropdown only for certain filter options */}
                {filterOption === "Time Posted" && (
                  <select
                    style={{
                      marginLeft: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }}
                    onChange={(event) =>
                      handleTimePostedFilter(event.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="<1 week">&lt;1 week</option>
                    <option value="<1 month">&lt;1 month</option>
                    <option value="<3 months">&lt;3 months</option>
                  </select>
                )}
                {/* Add other dropdown menus for other filter options as needed */}
                {filterOption === "All Titles" && (
                  <select
                    style={{
                      marginLeft: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }}
                    onChange={(event) =>
                      handleAllTitlesFilter(event.target.value)
                    }
                  >
                    <option value="Company">Company</option>
                    <option value="HUB DINING">HUB DINING</option>
                    <option value="ENGINEERING">ENGINEERING</option>
                    <option value="MUMA">MUMA</option>
                  </select>
                )}
                {filterOption === "Job Type" && (
                  <select
                    style={{
                      marginLeft: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }}
                    onChange={(event) =>
                      handleJobTypeFilter(event.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Remote">Remote</option>
                    <option value="Research">Research</option>
                    <option value="On Campus">On Campus</option>
                    <option value="Teaching Assistant">
                      Teaching Assistant
                    </option>
                  </select>
                )}
                {filterOption === "Salary" && (
                  <select
                    style={{
                      marginLeft: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }}
                    onChange={(event) => handleSalaryFilter(event.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="highest to lowest">Highest to Lowest</option>
                    <option value="lowest to highest">Lowest to Highest</option>
                  </select>
                )}
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "column",
            marginTop: "50px",
            width: "100%",
          }}
        >
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
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
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{ backgroundColor: "#252525", width: "50%", color: "black" }}
      >
        <JobPage info={info} />
      </Drawer>

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
          width: "72%",
          display: "flex",
          cursor: "pointer",
          flexDirection: "column",
          transform: isHovered ? "scale(1.1)" : "scale(1.0)",
          transition: "transform 0.3s",
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
    </div>
  );
}

const JobPage = ({ info }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  console.log("viewing job page", info.id);
  const handleApply = async () => {
    try {
      const requestData = {
        student_id: user.email,
        recruiter: info.recruiter,
        position_name: info.position_name,
      };
      await axios.post("http://localhost:8800/apply-to-job", requestData);
      setIsApplied(true);
    } catch (err) {
      console.error(err);
      // setStatus("Error applying to job");
    }
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", marginTop: "10%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#FD3953" }}
        >
          {info.company_name}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#FD3953",
            marginBottom: "40px",
            marginTop: "-20px",
          }}
        >
          {info.location}
        </p>
        <h2 style={{ fontSize: "1.8rem", color: "#FD3953" }}>
          <strong>Position: </strong>
          {info.position_name}
        </h2>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#FD3953",
          }}
        >
          Job Description
        </h3>
        <p style={{ lineHeight: "1.6", color: "#FD3953" }}>
          {info.jobdescription}
        </p>
      </div>

      <hr style={{ borderTop: "1px solid #FD3953", margin: "40px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#FD3953",
            }}
          >
            Salary
          </h3>
          <p style={{ lineHeight: "1.6", color: "#FD3953" }}>
            {info.salary}$/hr
          </p>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#FD3953",
            }}
          >
            Hiring
          </h3>
          <p style={{ lineHeight: "1.6", color: "#FD3953" }}>
            {info.hiring} student{info.hiring > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      {/* salary information */}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            backgroundColor: "#FD3953",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "12px 20px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleApply}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Quick Apply"}
        </button>
        <button
          style={{
            backgroundColor: "#fff",
            color: "#4CAF50",
            border: "1px solid #4CAF50",
            borderRadius: "5px",
            padding: "12px 20px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};
export default ExploreJobs;
