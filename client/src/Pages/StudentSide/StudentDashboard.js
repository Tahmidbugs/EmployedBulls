import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Navbar";

function StudentDashboard() {
  const [totalJobsApplied, setTotalJobsApplied] = useState(0);
  const [totalInterviews, setTotalInterviews] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalJobsApplied((prevCount) => prevCount + 1);
    }, 200);

    if (totalJobsApplied === 10) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [totalJobsApplied]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalInterviews((prevCount) => prevCount + 1);
    }, 400);

    if (totalInterviews === 3) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [totalInterviews]);

  return (
    <div style={{ display: "flex" }}>
      <Nav />

      <div
        style={{
          marginLeft: "50px",
          padding: "20px",
          backgroundColor: "#f2f2f2",
          width: "80%",
        }}
      >
        <nav>
          <div>
            <button
              style={{
                backgroundColor: "#FF2400",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                margin: "5px",
              }}
            >
              My Applications
            </button>
            <button
              style={{
                backgroundColor: "#FF2400",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                margin: "5px",
              }}
            >
              Messages
            </button>
            <button
              style={{
                backgroundColor: "#FF2400",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                margin: "5px",
              }}
            >
              <Link
                to="/explorejobs"
                style={{
                  color: "white",
                }}
              >
                Job Search
              </Link>
            </button>
            <button
              style={{
                backgroundColor: "#FF2400",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                margin: "5px",
              }}
            >
              <Link
                to="/explorecompanies"
                style={{
                  color: "white",
                }}
              >
                Explore Companies
              </Link>
            </button>
            <button
              style={{
                backgroundColor: "#FF2400",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                margin: "5px",
              }}
            >
              <Link
                to="/studentprofile"
                style={{
                  color: "white",
                }}
              >
                Profile Settings
              </Link>
            </button>
          </div>
        </nav>
        <div
          className="count-box"
          style={{ textAlign: "center", animation: "count-up 2s forwards" }}
        >
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
            Total Jobs Applied: {totalJobsApplied}
          </p>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
            Total Interviews: {totalInterviews}
          </p>
        </div>
        <div
          className="upcoming-box"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px grey",
            marginBottom: "20px",
          }}
        >
          <h2>Upcoming Interview</h2>
          <div>
            <p>Company A - Software Engineer</p>
            <p>Friday, April 16, 2023 at 2:00 PM EST</p>
          </div>
        </div>
        <div
          className="history-box"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px grey",
            marginBottom: "20px",
          }}
        >
          <h2>Recent Application History</h2>

          <div>
            <p>Company B - Front End Developer</p>
            <p>Status: In-Review</p>
            <p>Date Applied: April 3, 2023</p>
          </div>
          <div>
            <p>Company C - Full Stack Developer</p>
            <p>Status: Declined</p>
            <p>Date Applied: March 28, 2023</p>
          </div>
          <div>
            <p>Company D - Data Analyst</p>
            <p>Status: Interview Requested</p>
            <p>Date Applied: March 15, 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentDashboard;