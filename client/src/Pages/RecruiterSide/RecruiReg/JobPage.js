import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JobPageStyle.css';

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [applicantCount, setApplicantCount] = useState(0);
  const [editingJobDescription, setEditingJobDescription] = useState(false);
  const [newJobDescription, setNewJobDescription] = useState('');

  useEffect(() => {
    // You would need to fetch the data for the job and applicant count from the server here
    // and update the state variables 'job' and 'applicantCount' accordingly.

    const dummyJob = {
      companyName: 'Not Muma',
      jobTitle: 'Front-end Developer',
      jobDescription:
        'We are looking for a front-end developer to join our team.',
      qualifications: 'Experience with HTML, CSS, JavaScript, and React',
      location: 'New York',
      questionnaire: 'Have you ever built a React application from scratch?',
      hiringQuantity: 2,
    };
    const dummyApplicantCount = 3;

    setJob(dummyJob);
    setApplicantCount(dummyApplicantCount);
  }, []);

  const handleJobDescriptionEdit = () => {
    setEditingJobDescription(true);
    setNewJobDescription(job.jobDescription);
  };

  const handleJobDescriptionChange = event => {
    setNewJobDescription(event.target.value);
  };

  const handleJobDescriptionSubmit = () => {
    setJob({ ...job, jobDescription: newJobDescription });
    setEditingJobDescription(false);
    // You would need to push the updated job data to the server here
  };

  return (
    <div className='job-page'>
      <p>Company Name: {job.companyName}</p>
      <h1 className='job-title'>{job.jobTitle}</h1>
      {editingJobDescription ? (
        <div>
          <textarea
            value={newJobDescription}
            onChange={handleJobDescriptionChange}
          />
          <button onClick={handleJobDescriptionSubmit}>Save</button>
        </div>
      ) : (
        <p className='job-description' onClick={handleJobDescriptionEdit}>
          {job.jobDescription}
        </p>
      )}
      <p className='job-qualifications'>Qualifications: {job.qualifications}</p>
      <p className='job-location'>Location: {job.location}</p>
      <p className='job-questionnaire'>Questionnaire: {job.questionnaire}</p>
      <p className='job-hiring-quantity'>
        Hiring Quantity: {job.hiringQuantity}
      </p>
      <p className='applicant-count'>Number of applicants: {applicantCount}</p>
    </div>
  );
};

export default JobPage;
