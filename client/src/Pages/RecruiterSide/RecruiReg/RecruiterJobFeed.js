import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import "./Recruitstyle.css";
export default function RecruiterJobFeed() {
  const [jobs, setJobs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobDescription: "",
      qualifications: "",
      location: "",
    },
    onSubmit: (values, actions) => {
      setJobs([...jobs, values]);
      setIsAdding(false);
      actions.resetForm();
    },
  });

  return (
    <div>
      {isAdding ? (
        <Formik {...formik}>
          {({ isSubmitting }) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  className="form-control"
                  {...formik.getFieldProps("jobTitle")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  name="jobDescription"
                  className="form-control"
                  {...formik.getFieldProps("jobDescription")}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="qualifications">Qualifications</label>
                <input
                  type="text"
                  name="qualifications"
                  className="form-control"
                  {...formik.getFieldProps("qualifications")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  {...formik.getFieldProps("location")}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Add Job
              </button>
            </form>
          )}
        </Formik>
      ) : (
        <button onClick={() => setIsAdding(true)}>
          <i className="fas fa-plus-circle"></i> Add Job
        </button>
      )}
      <div>
        {jobs.map((job, index) => (
          <div key={index}>
            <h3>{job.jobTitle}</h3>
            <p>{job.jobDescription}</p>
            <p>Qualifications: {job.qualifications}</p>
            <p>Location: {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
