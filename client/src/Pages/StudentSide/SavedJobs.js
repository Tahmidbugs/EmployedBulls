import React, { useState, useEffect } from "react";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // fetch saved jobs data from an API or local storage
    const savedJobsData = localStorage.getItem("savedJobs");

    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
  }, []);

  return (
    <div>
      <h1>Saved Jobs</h1>
      {savedJobs.length > 0 ? (
        <ul>
          {savedJobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <button>Apply</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not saved any jobs yet.</p>
      )}
    </div>
  );
}

export default SavedJobs;
