import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { logoutCall } from "../../ContextCalls";
import { Container, Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const StudentAppForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [GPA, setGPA] = useState("");
  const [resume, setResume] = useState(null);

  const [major, setMajor] = useState("");
  // const [workExperience, setWorkExperience] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [workExperience, setWorkExperience] = useState({
    hasWorkExperience: false,
    companyName: "",
    position: "",
    responsibilities: "",
    startYear: "",
    endYear: "",
  });

  const apiKey = "YOUR_AFFINDA_API_KEY";

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError("Please select a file.");
      return;
    }
    console.log(resume);

    const formData = new FormData();
    formData.append("file", resume);

    try {
      const response = await axios.post(
        "http://localhost:8800/uploadresume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // do something with response data
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    const password = loggedInUser.password;
    const requestData = {
      fullName,
      studentId,
      email,
      phoneNumber,
      address,
      GPA,
      major,
      workExperience,
      resume,
      password,
    };
    try {
      console.log(requestData);
      await axios.post("http://localhost:8800/insert-student", requestData);
      navigate("/jobfeed");
    } catch (err) {
      console.error(err);
      setStatus("Error submitting application");
    }
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

    setResume(selectedFile);
  };

  const { dispatch } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "bold",
          }}
        >
          On-Campus Job Application Form
        </h1>
        <div>
          <h4>Upload your resume</h4>

          <div>
            <input type="file" onChange={handleChange} />
            {!resume && (
              <p>
                Drag and drop your resume file here, or click to select file
              </p>
            )}
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>Full Name:</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>Student ID:</span>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>University Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>Phone Number:</span>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>Address:</span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>GPA:</span>
          <input
            type="text"
            value={GPA}
            onChange={(e) => setGPA(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>Major:</span>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
              width: "100%",
            }}
            required
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.5rem" }}>
            Do you have any work experience?
          </span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              id="yes"
              name="hasWorkExperience"
              value="yes"
              checked={workExperience.hasWorkExperience === true}
              onChange={() =>
                setWorkExperience({
                  ...workExperience,
                  hasWorkExperience: true,
                })
              }
              style={{ marginRight: "0.5rem" }}
            />
            <label htmlFor="yes" style={{ marginRight: "1rem" }}>
              Yes
            </label>
            <input
              type="radio"
              id="no"
              name="hasWorkExperience"
              value="no"
              checked={workExperience.hasWorkExperience === false}
              onChange={() =>
                setWorkExperience({
                  ...workExperience,
                  hasWorkExperience: false,
                })
              }
            />
            <label htmlFor="no">No</label>
          </div>
        </label>

        {workExperience.hasWorkExperience && (
          <div>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "0.5rem" }}>Company Name:</span>
              <input
                type="text"
                value={workExperience.companyName}
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    companyName: e.target.value,
                  })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "none",
                  marginBottom: "1rem",
                  width: "100%",
                }}
                required
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "0.5rem" }}>Position:</span>
              <input
                type="text"
                value={workExperience.position}
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    position: e.target.value,
                  })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "none",
                  marginBottom: "1rem",
                  width: "100%",
                }}
                required
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "0.5rem" }}>Responsibilities:</span>
              <textarea
                value={workExperience.responsibilities}
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    responsibilities: e.target.value,
                  })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "none",
                  marginBottom: "1rem",
                  width: "100%",
                  minHeight: "10rem",
                }}
                required
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "0.5rem" }}>Start Year:</span>
              <input
                type="text"
                value={workExperience.startYear}
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    startYear: e.target.value,
                  })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "none",
                  marginBottom: "1rem",
                  width: "100%",
                }}
                required
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "0.5rem" }}>End Year:</span>
              <input
                type="text"
                value={workExperience.endYear}
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    endYear: e.target.value,
                  })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "none",
                  marginBottom: "1rem",
                  width: "100%",
                }}
                required
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentAppForm;
