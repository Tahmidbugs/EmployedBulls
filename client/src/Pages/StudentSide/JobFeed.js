import axios from "axios";
import React, { useState, useEffect } from "react";
// import JobComponent from "../../Components/JobComponent";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Nav from "./Navbar";
import { Container } from 'reactstrap';

const JobFeed = () => {
  const [filter, setFilter] = useState("all");
  const [selectedfilterOptions, setfilterOptions] = useState([]);
  const [selectedType, setSelectedType]= useState("");
  const [open, setOpen] = useState(false);
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

  const filterOptions = [
    'Salary', 'Time Posted', 'Job Type', 'All Titles' 
  ];
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
  filteredJobs(jobs.filter((job) => job.title === selectedTitle || selectedTitle === "All Titles"));
};

// Function to filter by job type
const handleJobTypeFilter = (selectedType) => {
  setSelectedType(selectedType);
  filteredJobs(jobs.filter((job) => job.type === selectedType || selectedType === "All Types"));
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

  const [isOpen, setIsOpen] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  function handleTimePostedFilter(value) {
    // Handle the time posted filter based on the selected value
    console.log(`Selected time posted filter: ${value}`);
  }
  
  const [isApplied, setIsApplied] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Nav />
      <div style={{ width: "60%" }}>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          style={{ backgroundColor: "grey", width: "50%", color: "black" }}
        >
          <JobPage info={info} />
        </Drawer>
      
        <div>
  {filterOptions.map((filterOption) => (
    <div key={filterOption}>
      <button
        style={{
          margin: '5px',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#f0f0f0',
          color: '#333',
          cursor: 'pointer',
        }}
        className={`choice-button ${filterOptions.includes(filterOption) ? 'selected' : ''}`}
        onClick={() => handlefilterOptionClick(filterOption)}
      >
        {filterOption}
        {/* Render dropdown only for certain filter options */}
        {filterOption === 'Time Posted' && (
          <select
            style={{
              marginLeft: '5px',
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: '#fff',
              color: '#333',
              cursor: 'pointer',
            }}
            onChange={(event) => handleTimePostedFilter(event.target.value)}
          >
            <option value="">Select</option>
            <option value="<1 week">&lt;1 week</option>
            <option value="<1 month">&lt;1 month</option>
            <option value="<3 months">&lt;3 months</option>
          </select>
        )}
        {/* Add other dropdown menus for other filter options as needed */}
        {filterOption === 'All Titles' && (
          <select
            style={{
              marginLeft: '5px',
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: '#fff',
              color: '#333',
              cursor: 'pointer',
            }}
            onChange={(event) => handleAllTitlesFilter(event.target.value)}
          >
            <option value="All Titles">All Titles</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Product Manager">Product Manager</option>
          </select>
        )}
        {filterOption === 'Job Type' && (
          <select
            style={{
              marginLeft: '5px',
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: '#fff',
              color: '#333',
              cursor: 'pointer',
            }}
            onChange={(event) => handleJobTypeFilter(event.target.value)}
            >
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="Research">Research</option>
              <option value="On Campus">On Campus</option>
              <option value="Teaching Assistant">Teaching Assistant</option>
            </select>
          )}
          {filterOption === 'Salary' && (
            <select
              style={{
                marginLeft: '5px',
                padding: '5px',
                borderRadius: '5px',
                backgroundColor: '#fff',
                color: '#333',
                cursor: 'pointer',
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
            justifyContent: "center",
            flexWrap: "wrap",
          }}
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
              toggleDrawer={toggleDrawer}
              setInfo={setInfo}
            />
          ))}
        </div>
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
  toggleDrawer,
  setInfo,
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
      onClick={() => {
        toggleDrawer();
        setInfo({
          jobdescription,
          company_name,
          position_name,
          hiring,
          apply,
          applied,
        });
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

const JobPage = ({ info }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "2.2rem", fontWeight: "bold" }}>
          {info.company_name}
        </h1>
        <h2 style={{ fontSize: "1.8rem", color: "#666" }}>
          {info.position_name}
        </h2>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Job Description
        </h3>
        <p style={{ lineHeight: "1.6" }}>{info.jobdescription}</p>
      </div>

      <hr style={{ borderTop: "1px solid #ccc", margin: "40px 0" }} />

      <div style={{ marginBottom: "40px" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Hiring
        </h3>
        <p style={{ lineHeight: "1.6" }}>
          {info.hiring} student{info.hiring > 1 ? "s" : ""}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            backgroundColor: "#4CAF50",
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
          {isApplied ? "Applied" : info.apply}
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
export default JobFeed;
