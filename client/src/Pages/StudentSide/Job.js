import React, { useState } from 'react';

const Job = (props) => {
const [applied, setApplied] = useState(false);
const [saved, setSaved] = useState(false);
const [job, setJob] = useState({
id: 1,
title: "Software Developer",
company: "Abdur's Monke Company",
description: "We are looking for a software developer to join our team. The ideal candidate will have experience in Java and JavaScript.",
hiring: true,
qualifications: "Bachelor's degree in Computer Science or related field, 2 years of experience in software development",
applied: true
},
{
id: 2,
title: "Data Analyst",
company: "Beta Corp.",
description: "We are looking for a Data Analyst to join our team. The ideal candidate will have experience in SQL and Excel.",
hiring: true,
qualifications: "Bachelor's degree in Computer Science or related field, 2 years of experience in data analysis",
applied: false
});

const handleSave = () => {
  if(!saved){
  alert("Job saved to your saved jobs list!");
  }
  else{
  alert("Job removed from your saved jobs list!");
  }
  setSaved(!saved);
};

const handleApply = () => {
if (job.applied) {
alert("You have already applied for this role.");
} else {
alert("Application submitted successfully!");
setJob({...job, isApplied: true});
}
};

return (
<div>
<h1>{job.title}</h1>
<p>{job.description}</p>
<p>Hiring status: {job.hiring ? "Open" : "Closed"}</p>
<p>Qualifications: {job.qualifications}</p>
<p>About the company: {job.company}</p>
{!applied ? (
<button onClick={handleApply}>Apply</button>
) : (
<p>You have already applied for this role</p>
)}
<button onClick={handleSave}>
{saved ? "Unsave" : "Save"}
</button>
<button>Contact Recruiter</button>
</div>
);
};

export default Job;