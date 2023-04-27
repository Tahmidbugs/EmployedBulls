import React, { useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import Lottie from "react-lottie";

import animationdata from "../../../Assets/Lotties/added.json";
const AddJobModal = ({ handleModalClose, jobcount, setJobCount }) => {
  const [company_name, setCompany_name] = useState("");
  const [position_name, setPosition_name] = useState("");
  const [job_description, setJob_description] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [hiring, setHiring] = useState("");
  // // company_name,
  // position_name,
  // job_description,
  // recruiter,
  // applied_student,
  const { user, dispatch } = useContext(AuthContext);
  const companies = [
    "The Hub Dining",
    "College of Engineering",
    "MUMA",
    "Office of Student Employment",
    "USF Bookstore",
  ];

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const jobtype = [
    "On Campus",
    "Full Time",
    "Part Time",
    "Remote",
    "Research Assistant",
    "Teaching Assistant",
    "Dining",
    "Internship",
  ];

  // const [selectedjobtype, setSelectedjobtype] = useState(jobtype[0]);
  const [loading, setLoading] = useState(false);
  const [selectedjobtypes, setSelectedjobtypes] = useState(jobtype[0]);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      company_name,
      position_name,
      job_description,
      location: jobLocation,
      salary,
      hiring,
      recruiter: user.email,
    };
    console.log("trying to add job", job);
    setLoading(true);
    axios
      .post("http://localhost:8800/api/job/addJob", job)
      .then((res) => {
        console.log(res);
        setShowAnimation(true); // Start animation when job is added
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          alert("Something went wrong!");
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setShowAnimation(false); // Stop animation after 4 seconds
          handleModalClose();
          setJobCount(jobcount + 1);
        }, 4000);
      });
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.8)",
        zIndex: "999",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "600px",
          width: "100%",
          background: "#fff",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.3)",
          overflow: "auto",
        }}
      >
        {showAnimation && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.8)",
              zIndex: "999",
            }}
          >
            <Lottie options={defaultOptions} height={220} width={220} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              Add a Job
            </h2>
            <button
              type="button"
              onClick={handleModalClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                fontWeight: "bold",
                padding: "0",
                margin: "0",
              }}
            >
              X
            </button>
          </div>

          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "8px",
                }}
              >
                <label
                  htmlFor="company_name"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Company Name:
                </label>
                <select
                  id="company_name"
                  value={company_name}
                  onChange={(e) => setCompany_name(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                    marginBottom: "8px",
                  }}
                >
                  <option value="">Select a company</option>
                  {companies.map((company, index) => (
                    <option
                      key={index}
                      value={company}
                      style={{ backgroundColor: "#FD3953", borderRadius: 6 }}
                    >
                      {company}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  marginBottom: "8px",
                }}
              >
                <label
                  htmlFor="jobLocation"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Job Location:
                </label>
                <input
                  type="text"
                  id="jobLocation"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                    marginBottom: "8px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginBottom: "8px",
              }}
            >
              <label
                htmlFor="position_name"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Position Name:
              </label>
              <input
                type="text"
                id="position_name"
                value={position_name}
                onChange={(e) => setPosition_name(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "8px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="jobTypes"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Job Types:
              </label>
              <div
                id="jobTypes"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {jobtype.map((jobtype) => (
                  <button
                    key={jobtype}
                    onClick={() =>
                      setSelectedjobtypes((prevSelected) =>
                        prevSelected.includes(jobtype)
                          ? prevSelected.filter((type) => type !== jobtype)
                          : [...prevSelected, jobtype]
                      )
                    }
                    style={{
                      background: selectedjobtypes.includes(jobtype)
                        ? "#FD3953"
                        : "#E5E5EA",
                      color: selectedjobtypes.includes(jobtype)
                        ? "#FFF"
                        : "#000",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px",
                      marginRight: "10px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      opacity: 1,
                      transform: "opacity 0.5s ease-in-out",
                    }}
                    type="button"
                    onMouseEnter={(event) => {
                      event.target.style.opacity = "0.6";
                    }}
                    onMouseLeave={(event) => {
                      event.target.style.opacity = "1.0";
                    }}
                  >
                    {jobtype}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                marginBottom: "8px",
              }}
            >
              <label
                htmlFor="job_description"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Job Description:
              </label>
              <textarea
                id="job_description"
                value={job_description}
                onChange={(e) => setJob_description(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                  marginBottom: "8px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "8px",
                }}
              >
                <label
                  htmlFor="salary"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Salary:
                </label>
                <input
                  type="text"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                    marginBottom: "8px",
                  }}
                />
              </div>
              <div
                style={{
                  marginBottom: "8px",
                }}
              >
                <label
                  htmlFor="hiring"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Hiring:
                </label>
                <input
                  type="text"
                  id="hiring"
                  value={hiring}
                  onChange={(e) => setHiring(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
                    marginBottom: "8px",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <Bars color="#FD3953" />
              </div>
            ) : (
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#FD3953",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
