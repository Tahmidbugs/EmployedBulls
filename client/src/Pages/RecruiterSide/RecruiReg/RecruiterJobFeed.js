import React, { useState } from 'react';
import { Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import './Recruitstyle.css';
import Nav from '../Dashboard Components/Navbar';

export default function RecruiterJobFeed() {
  const [jobs, setJobs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const formik = useFormik({
    initialValues: {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      qualifications: '',
      location: '',
    },
    onSubmit: (values, actions) => {
      setJobs([...jobs, values]);
      setIsAdding(false);
      actions.resetForm();
    },
  });

  return (
    <div style={{ display: 'flex' }}>
      <Nav />
      <div className='form-container'>
        {isAdding ? (
          <Formik {...formik}>
            {({ isSubmitting }) => (
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='companyName'>Company Name</label>
                  <input
                    type='text'
                    name='companyName'
                    className='form-control'
                    {...formik.getFieldProps('companyName')}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='jobTitle'>Job Title</label>
                  <input
                    type='text'
                    name='jobTitle'
                    className='form-control'
                    {...formik.getFieldProps('jobTitle')}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='jobDescription'>Job Description</label>
                  <textarea
                    name='jobDescription'
                    className='form-control'
                    {...formik.getFieldProps('jobDescription')}
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label htmlFor='qualifications'>Qualifications</label>
                  <input
                    type='text'
                    name='qualifications'
                    className='form-control'
                    {...formik.getFieldProps('qualifications')}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='location'>Location</label>
                  <input
                    type='text'
                    name='location'
                    className='form-control'
                    {...formik.getFieldProps('location')}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={isSubmitting}
                >
                  Add Job
                </button>
              </form>
            )}
          </Formik>
        ) : (
          <button className='btn btn-primary' onClick={() => setIsAdding(true)}>
            <i className='fas fa-plus-circle'></i> Add Job
          </button>
        )}
        {jobs.length === 0 ? (
          <p>You haven't added a job</p>
        ) : (
          <div>
            {jobs.map((job, index) => (
              <div key={index} className='form-container'>
                <Link to={{ pathname: `/jobPageRec/${index}`, state: { job } }}>
                  <p>Company Name: {job.companyName}</p>
                  <h3>{job.jobTitle}</h3>
                  <p>{job.jobDescription}</p>
                  <p>Qualifications: {job.qualifications}</p>
                  <p>Location: {job.location}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
