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
    <div style={{ display: 'flex', boxShadow: 'none' }}>
      <Nav />
      <div className='dashboard'>
        <div className='dashboard-header'>
          <div className='header-right'>
            <span>Recruiter Name</span>
            <FaUserCircle size={30} style={{ marginLeft: 10 }} />
            <BiBell size={30} style={{ marginLeft: 10 }} />
          </div>
          {/* <br />
          <br />

          <br />
          <br /> */}

          <h1>Dashboard</h1>
          <h5>Hello Recruiter! Here is a summary of your hiring journey.</h5>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className='dashboard__section dashboard__section--recruiter-job-feed'>
              <h2>Recruiter Job Feed</h2>
              <RecentlyAddedJobs />
            </div>

            <div className='dashboard__section dashboard__section--inbox'>
              <h2>Inbox</h2>
              <LatestMessages />
              {/* <InboxWithStudentMessages /> */}
            </div>
            <div className='dashboard__section dashboard__section--upcoming-interviews'>
              <h2>Upcoming Interviews</h2>
              <UpcomingInterviews />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              boxShadow: 'none',
              borderRadius: 0,
            }}
          >
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

const LatestMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      message: 'Hi, I am interested in the Software Engineer position.',
      date: '2023-03-16',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Hi, I am interested in the Product Manager position.',
      date: '2023-03-15',
    },
  ]);

  return (
    <div className='inbox'>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message.id}>
              <td>{message.name}</td>
              <td className='inbox__message'>{message.message}</td>
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
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      date: '2023-03-16',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      date: '2023-03-15',
    },
  ]);

  return (
    <div className='recruiter-job-feed'>
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
          {jobs.map(job => (
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
