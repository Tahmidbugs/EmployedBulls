import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "./Navbar";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import Lottie from "react-lottie";
import appliedData from "../../Assets/Lotties/applied.json";
import videoData from "../../Assets/Lotties/video.json";
import { PieChart } from "react-minimal-pie-chart";
import { IoIosSave } from "react-icons/io";
import { BsPersonVideo2 } from "react-icons/bs";

function StudentDashboard() {
  const [totalJobsApplied, setTotalJobsApplied] = useState(0);
  const [totalInterviews, setTotalInterviews] = useState(0);
  const { user, dispatch } = useContext(AuthContext);
  const [student, setStudent] = useState({});
  const [jobs, setJobs] = useState([]); // add a new state for job data

  console.log("dashboard user", student);
  console.log("dashboard jobs", jobs);

  useEffect(() => {
    let isMounted = true; // add a flag to check if component is mounted
    axios
      .get("http://localhost:8800/api/student/getStudentInfo", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        if (isMounted) {
          // only update state if component is still mounted
          setStudent(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // make second axios call only when student data is available
    axios
      .get("http://localhost:8800/api/student/getStudentJobs", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        if (isMounted) {
          // only update state if component is still mounted
          setJobs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false; // cleanup function to update flag when component is unmounted
    };
  }, [user.email]); // add dependencies for useEffect

  //   const interval = setInterval(() => {
  //     setTotalJobsApplied((prevCount) => prevCount + 1);
  //   }, 200);

  //   if (totalJobsApplied === 10) {
  //     clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  // }, [totalJobsApplied]);

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
      {student && jobs && (
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
                <strong style={{ color: "#FF3953" }}>
                  {student.full_name}{" "}
                </strong>
              </span>
              <FaUserCircle size={30} style={{ marginLeft: 10 }} />
              <BiBell size={30} style={{ marginLeft: 10 }} />
            </div>
            <br />

            <h2>
              Hey{" "}
              <strong style={{ color: "#FF3953" }}>{student.full_name} </strong>
              ! Welcome to your dashboard
            </h2>
            <p>
              Here is a summary of your recruitment journey. You can view your
              applications and interviews here.
            </p>

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
                <ApplicationCount jobs={jobs} />
                <ApplicationPieChart />
                {/* <ApplicationPieChart /> */}
                <InterviewStatus />
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
                <ApplicationHistory jobs={jobs} />
                <SavedJobs />
                {/* <ApplicationPieChart />{" "} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ApplicationCount = ({ jobs }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: appliedData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: videoData,
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
const ApplicationPieChart = ({ jobs }) => {
  const interviews = 1;
  const applied = 5;
  const rejections = 2;
  const UnderReview = 1;

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
        Application summary
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
            { title: "Applied", value: applied, color: "#E35627" },
            { title: "Interviews", value: interviews, color: "#C11137" },
            { title: "Rejections", value: rejections, color: "#6A2135" },
            { title: "Under Review", value: UnderReview, color: "#6A4135" },
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
                backgroundColor: "#6A2135",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <p>Rejections</p>
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
                backgroundColor: "#6A4135",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <p>Under Review</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InterviewStatus = ({ jobs }) => {
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
        <h2 style={{ fontWeight: "700" }}>Scheduled Interviews</h2>
        You don't have an interview scheduled yet.
      </div>
    </div>
  );
};

const ApplicationHistory = ({ jobs }) => {
  jobs = jobs.slice(0, 3); // only display the first 3 jobs

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
        Recent Application History
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
          {jobs.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No jobs found
              </td>
            </tr>
          )}

          {jobs.map((job, index) => (
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
export default StudentDashboard;
