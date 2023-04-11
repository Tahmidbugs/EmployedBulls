import React, { useState } from 'react';
import "./studentdashboard.css";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <nav>
        <h1>EmployedBulls</h1>
        <div>
          <button>My Applications</button>
          <button>Messages</button>
          <button><Link to="/jobfeed">Job Search</Link></button>
          <button>Explore Companies</button>
          <button> <Link to="/studentprofile">Profile Settings</Link> </button>
        </div>
      </nav>
      <div className="count-box">
        <p>Total Jobs Applied: 10</p>
        <p>Total Interviews: 3</p>
      </div>
      <div className="upcoming-box">
        <h2>Upcoming Interview</h2>
        <div>
          <p>Company A - Software Engineer</p>
          <p>Friday, April 16, 2023 at 2:00 PM EST</p>
        </div>
      </div>
      <div className="history-box">
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
          <p>Status: Accepted</p>
          <p>Date Applied: March 24, 2023</p>
        </div>
        <button>
  <Link to="/studentapplications">View All Applications</Link>
</button>
      </div>
      <div className="saved-jobs-box">
        <h2>Saved Jobs</h2>
        <div>
          <p>Company E - Back End Developer</p>
          <p>Days Remaining: 4</p>
        </div>
        <div>
          <p>Company F - UI/UX Designer</p>
          <p>Days Remaining: 12</p>
        </div>
        <div>
          <p>Company G - Project Manager</p>
          <p>Days Remaining: 20</p>
        </div>
      </div>
      <button>
        <Link to="/savedjobs">View all Saved Jobs</Link>
      </button>
    </div>
  );
}

export default Dashboard;