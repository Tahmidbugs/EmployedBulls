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
import { PieChart } from "react-minimal-pie-chart";
import { IoIosSave } from "react-icons/io";
import { BsPersonVideo2 } from "react-icons/bs";
import axios from "axios";
import AddJobModal from "../Dashboard Components/AddJobModal";
import { Link, useNavigate } from "react-router-dom";
function Dashboard() {
  const [addedJobs, setAddedJobs] = React.useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const [jobModal, setJobModal] = useState(false);
  const [jobcount, setJobCount] = React.useState(0);
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
  }, [jobcount]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#D9D9D9 ",
        fontFamily: "Roboto",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
      }}
    >
      <Nav />
      {user && addedJobs && (
        <div
          style={{
            width: "80%",
            marginLeft: "50px",
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          <div>
            <div className="header-right">
              <span>
                <strong style={{ color: "#FF3953" }}>{user.email} </strong>
              </span>
              <FaUserCircle size={30} style={{ marginLeft: 10 }} />
              <BiBell size={30} style={{ marginLeft: 10 }} />
            </div>
            <br />

            <h2>
              <strong style={{ color: "#FF3953" }}> Hello, Recruiter!</strong>
            </h2>
            <p>Here's what's happening with your hiring journey</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <AddJob
                  jobModal={jobModal}
                  setJobModal={setJobModal}
                  totalJobs={addedJobs.length}
                />
                {jobModal && (
                  <AddJobModal
                    handleModalClose={() => setJobModal(false)}
                    jobcount={jobcount}
                    setJobCount={setJobCount}
                  />
                )}
                <InterviewStatus />
                <ApplicationPieChart addedJobs={addedJobs} />
                {/* <ApplicationPieChart /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  marginTop: "40px",
                }}
              >
                <ApplicationHistory addedJobs={addedJobs} />
                {/* <SavedJobs /> */}
                {/* <ApplicationPieChart />{" "} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AddJob = ({ jobModal, setJobModal, totalJobs }) => {
  console.log("total jobs", totalJobs);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimatonData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [totalJobsCount, setTotalJobsCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTotalJobsCount((prevCount) => prevCount + 1);
    }, 200);

    if (totalJobs == totalJobsCount) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [totalJobsCount, totalJobs]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E6E3E3",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div
        className="count-box"
        style={{ textAlign: "center", animation: "count-up 2s forwards" }}
      >
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
          You have added: {totalJobsCount} jobs!
        </p>
      </div>
      <button className="btn btn--primary" onClick={() => setJobModal(true)}>
        <Lottie options={defaultOptions} height={100} width={100} />
      </button>
      <p>Add a new job</p>
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

const ApplicationCount = ({ jobs }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimatonData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: AnimatonData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "33%",
        height: "30vh",
        backgroundColor: "#E6E3E3",
        borderRadius: "20px",
        cursor: "pointer",
        opacity: "1.0",
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(event) => {
        event.target.style.opacity = "0.9";
      }}
      onMouseLeave={(event) => {
        event.target.style.opacity = "1.0";
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Lottie options={defaultOptions} width={60} height={60} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <h2 style={{ color: "#FF3953", fontWeight: "700" }}>{jobs.length}</h2>
          <p style={{ color: "#FF3953", fontWeight: "700" }}>
            Total Jobs Applied
          </p>
        </div>
      </div>
      <div style={{ marginTop: "-0px" }}>
        <div>
          <Lottie options={defaultOptions2} width={60} height={60} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <h2 style={{ color: "#FF3953", fontWeight: "700" }}>0</h2>
          <p style={{ color: "#FF3953", fontWeight: "700" }}>
            Total Interviews
          </p>
        </div>
      </div>
    </div>
  );
};
const ApplicationPieChart = ({ addedJobs }) => {
  const interviews = 1;
  const jobsAdded = addedJobs.length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "33%",
        backgroundColor: "#E6E3E3",
        borderRadius: "20px",
        flexDirection: "column",
        cursor: "pointer",
        opacity: "1.0",
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(event) => {
        event.target.style.opacity = "0.9";
      }}
      onMouseLeave={(event) => {
        event.target.style.opacity = "1.0";
      }}
    >
      <h5 style={{ color: "#FF3953", fontWeight: "700", marginTop: "20px" }}>
        Recruitment status
      </h5>
      <div
        style={{
          display: "flex",
          flexDirection: "row",

          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <PieChart
          data={[
            { title: "Applied", value: jobsAdded, color: "#E35627" },
            { title: "Interviews", value: interviews, color: "#C11137" },
          ]}
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            marginBottom: "20px",
            width: "45%",
            // height: "40%",
          }}
        />
        {/* color codes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#E38627",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <p>Applied</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#C13C37",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <p>Interviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InterviewStatus = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "30%",
        backgroundColor: "#E6E3E3",
        height: "30vh",
        borderRadius: "20px",
        cursor: "pointer",
        opacity: "1.0",
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(event) => {
        event.target.style.opacity = "0.9";
      }}
      onMouseLeave={(event) => {
        event.target.style.opacity = "1.0";
      }}
    >
      <BsPersonVideo2 size={50} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ fontWeight: "700" }}>Schedule Interviews</h2>
        You did not schedule any interviews yet
        <button
          style={{
            backgroundColor: "#FF3953",
            color: "white",
            padding: 20,
            marginTop: 20,
            borderRadius: 20,
          }}
          onClick={() => {
            navigate("/JobAdded");
          }}
        >
          Schedule
        </button>
      </div>
    </div>
  );
};

const ApplicationHistory = ({ addedJobs }) => {
  addedJobs = addedJobs.slice(0, 3); // only display the first 3 addedJobs

  return (
    <div
      style={{
        backgroundColor: "#E6E3E3",
        borderRadius: "10px",
        padding: "20px",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your recently added jobs
      </h2>
      <table
        style={{
          width: "100%",
          backgroundColor: "#252525",
          color: "#D5D5D5",
          borderRadius: 30,
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid #CCCCCC",
              paddingBottom: "10px",
              color: "#252525",
            }}
          >
            <th
              style={{
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "12px",
                fontWeight: "bold",
                width: "500px",
              }}
            >
              Position
            </th>
            <th
              style={{
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "12px",
                fontWeight: "bold",
                width: "500px",
              }}
            >
              Company
            </th>
            <th
              style={{
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "12px",
                fontWeight: "bold",
                width: "500px",
              }}
            >
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {addedJobs.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No addedJobs found
              </td>
            </tr>
          )}

          {addedJobs.map((job, index) => (
            <tr
              key={index}
              style={{ borderBottom: "1px solid #CCCCCC", paddingTop: "10px" }}
            >
              <td style={{ fontSize: "16px", width: 40, fontWeight: "bold" }}>
                {job.position_name}
              </td>
              <td style={{ fontSize: "16px", width: 40 }}>
                {job.company_name}
              </td>
              <td style={{ fontSize: "16px", width: 40 }}>{job.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SavedJobs = ({ jobs }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "30%",
        backgroundColor: "#FF3953",
        height: "30vh",
        borderRadius: "20px",
        cursor: "pointer",
        opacity: "1.0",
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(event) => {
        event.target.style.opacity = "0.9";
      }}
      onMouseLeave={(event) => {
        event.target.style.opacity = "1.0";
      }}
    >
      <IoIosSave size={50} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ fontWeight: "700" }}>Saved Jobs</h2>
        You haven't saved any jobs yet.
      </div>
    </div>
  );
};

export default Dashboard;
