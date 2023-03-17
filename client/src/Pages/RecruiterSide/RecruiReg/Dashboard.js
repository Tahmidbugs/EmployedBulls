import React, { useState } from 'react';
import RecruiterJobFeed from './RecruiterJobFeed';
import JobAdded from '../Dashboard Components/JobAdded';
import InboxWithStudentMessages from '../Dashboard Components/InboxWithStudentMessages';
import UpcomingInterviews from '../Dashboard Components/UpcomingInterviews';
import '../Dashboard Components/dashboardstyle.css';
import Nav from '../Dashboard Components/Navbar';
import { BiBell } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <Nav />
      <div className='dashboard'>
        <div className='dashboard-header'>
          <div className='header-right'>
            <span>Recruiter Name</span>
            <FaUserCircle size={30} style={{ marginLeft: 10 }} />
            <BiBell size={30} style={{ marginLeft: 10 }} />
          </div>
          <br />
          <br />

          <br />
          <br />

          <h1>Dashboard</h1>
          <p>Hello Recruiter! Here is a summary of your hiring journey.</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className='dashboard__section dashboard__section--recruiter-job-feed'>
              <RecruiterJobFeed />
            </div>

            <div className='dashboard__section dashboard__section--inbox'>
              <h2>Inbox</h2>
              <InboxWithStudentMessages />
            </div>
            <div className='dashboard__section dashboard__section--upcoming-interviews'>
              <h2>Upcoming Interviews</h2>
              <UpcomingInterviews />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className='dashboard__section dashboard__section--job-added'>
              <h2>Job Added</h2>
              <JobAdded />
            </div>

            <div className='dashboard__section dashboard__section--job-added'>
              <h2>Applicants</h2>
              <JobAdded />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
