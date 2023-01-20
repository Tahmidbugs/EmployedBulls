import React from "react";
import JobComponent from "../../Components/JobComponent";

const JobFeed = () => {
  return (
    <>
      <h2>Job List: Nav bar filter, sign out, darkmode lightmode</h2>
      <div>
        <JobComponent />
        <JobComponent />
        <JobComponent />
        <JobComponent />
      </div>
    </>
  );
};

export default JobFeed;
