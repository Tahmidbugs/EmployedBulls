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
import AddJobModal from "../Dashboard Components/AddJobModal";
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Nav />
      <div style={{ height: "100vh" }}>
        <div
          className="dashboard-header"
          style={{ height: "100vh", width: "80%" }}
        >
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
