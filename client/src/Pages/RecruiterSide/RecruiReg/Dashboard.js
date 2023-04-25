import React, { useContext, useState } from "react";
import RecruiterJobFeed from "./RecruiterJobFeed";
import InboxWithStudentMessages from "../Dashboard Components/InboxWithStudentMessages";
import UpcomingInterviews from "../Dashboard Components/UpcomingInterviews";
import "../Dashboard Components/dashboardstyle.css";
import Nav from "../Dashboard Components/Navbar";
import { BiBell } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import AnimatonData from "../../../Assets/Lotties/Add.json";
import Lottie from "react-lottie";
import { Bars } from "react-loader-spinner";

import axios from "axios";
function Dashboard() {
  const [addedJobs, setAddedJobs] = React.useState([]);
  const { user, dispatch } = useContext(AuthContext);

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
    <div style={{ display: "flex" }}>
      <Nav />
      <div style={{ height: "100vh" }}>
        <div className="dashboard-header">
          <div className="header-right">
            <span>Recruiter Name</span>
            <FaUserCircle size={30} style={{ marginLeft: 10 }} />
            <BiBell size={30} style={{ marginLeft: 10 }} />
          </div>
          <br />
          <br />

          <h1>Dashboard</h1>
          <h5>Hello Recruiter! Here is a summary of your hiring journey.</h5>
          <br />
          <br />

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "33%" }}>
              <h5>Add a new job</h5>
              <AddJob />
            </div>

            <div className="dashboard__section dashboard__section--inbox">
              <h2>Inbox</h2>
              <LatestMessages />
              {/* <InboxWithStudentMessages /> */}
            </div>
            <div className="dashboard__section dashboard__section--upcoming-interviews">
              <h2>Upcoming Interviews</h2>
              <UpcomingInterviews />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              boxShadow: "none",
              borderRadius: 0,
            }}
          >
            <div className="dashboard__section dashboard__section--job-added">
              <h2>Job Summary</h2>
              {/* job list added by recruiter */}
              <Last2jobs addedJobs={addedJobs} />
            </div>

            <div className="dashboard__section dashboard__section--job-added">
              <h2>Applicants</h2>
              {/* <JobAdded /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AddJobModal = ({ handleModalClose }) => {
  const [company_name, setCompany_name] = useState("");
  const [position_name, setPosition_name] = useState("");
  const [job_description, setJob_description] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [hiring, setHiring] = useState("");
  // // company_name,
  // position_name,
  // job_description,
  // recruiter,
  // applied_student,
  const { user, dispatch } = useContext(AuthContext);
  const companies = [
    "The Hub Dining",
    "College of Engineering",
    "MUMA",
    "Office of Student Employment",
    "USF Bookstore",
  ];
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      company_name,
      position_name,
      job_description,
      jobLocation,
      salary,
      hiring,
      recruiter: user.email,
    };
    console.log("trying to add job", job);
    // loading  = true;
    setLoading(true);
    axios
      .post("http://localhost:8800/api/job/addJob", job)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          alert("Something went wrong!");
        }
      });

    // loading = false;
    setLoading(false);
    handleModalClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.8)",
        zIndex: "999",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "600px",
          width: "100%",
          background: "#fff",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.3)",
          overflow: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              Add a Job
            </h2>
            <button
              type="button"
              onClick={handleModalClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                fontWeight: "bold",
                padding: "0",
                margin: "0",
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="company_name"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Company Name:
              </label>
              <select
                id="company_name"
                value={company_name}
                onChange={(e) => setCompany_name(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              >
                <option value="">Select a company</option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="position_name"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Position Name:
              </label>
              <input
                type="text"
                id="position_name"
                value={position_name}
                onChange={(e) => setPosition_name(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="job_description"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Job Description:
              </label>
              <textarea
                id="job_description"
                value={job_description}
                onChange={(e) => setJob_description(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              />
            </div>
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="jobLocation"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Job Location:
              </label>
              <input
                type="text"
                id="jobLocation"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              />
            </div>
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="salary"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Salary:
              </label>
              <input
                type="text"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              />
            </div>
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="hiring"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Hiring:
              </label>
              <input
                type="text"
                id="hiring"
                value={hiring}
                onChange={(e) => setHiring(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <Bars color="#00BFFF" />
              </div>
            ) : (
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#00BFFF",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const AddJob = () => {
  // Beautiful button for adding job
  // lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimatonData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [jobModal, setJobModal] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>You have added {} jobs</p>
      <button className="btn btn--primary" onClick={() => setJobModal(true)}>
        <Lottie options={defaultOptions} height={100} width={100} />
      </button>
      <p>Add a new job</p>
      {jobModal && <AddJobModal handleModalClose={() => setJobModal(false)} />}
    </div>
  );
};

const Last2jobs = ({ addedJobs }) => {
  return (
    <div>
      {/* tabular format */}
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Position Name</th>
            <th>Hiring</th>
          </tr>
        </thead>
        <tbody>
          {addedJobs.map((job) => (
            <tr key={job._id}>
              <td>{job.company_name}</td>
              <td>{job.position_name}</td>
              <td>{job.hiring}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LatestMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      message: "Hi, I am interested in the Software Engineer position.",
      date: "2023-03-16",
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Hi, I am interested in the Product Manager position.",
      date: "2023-03-15",
    },
  ]);

  return (
    <div className="inbox">
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.name}</td>
              <td className="inbox__message">{message.message}</td>
              <td>{message.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RecentlyAddedJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      date: "2023-03-16",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Facebook",
      location: "Menlo Park, CA",
      date: "2023-03-15",
    },
  ]);

  return (
    <div className="recruiter-job-feed">
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
