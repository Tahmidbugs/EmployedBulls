import React, { useState } from 'react';
import "./studentapplications.css";


const StudentApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      job: {
        id: 1,
        title: "Software Developer",
        company: "Tahmid's Playground"
      },
      status: "Under Review"
    },
    {
      id: 2,
      job: {
        id: 2,
        title: "Data Analyst",
        company: "Abdur's Bain"
      },
      status: "Applied"
    },
    {
      id: 3,
      job: {
        id: 3,
        title: "Web Designer",
        company: "Musa at his finest"
      },
      status: "Decision"
    }
  ]);
  

  return (
    <div>
      <h1>My Applications</h1>
      <h2>When a decision's been reached you will receive an email</h2>
      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.job.title}</td>
                <td>{application.job.company}</td>
                <td>{application.status}</td>
                <td>
                  <a href={`/job/${application.job.id}`}>View Job</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentApplications;
