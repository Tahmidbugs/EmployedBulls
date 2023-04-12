import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { logoutCall } from "../../ContextCalls";

const StudentAppForm = () => {
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [GPA, setGPA] = useState("");
  const [major, setMajor] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [hasWorkExperience, setHasWorkExperience] = useState(false);
  const [disabilities, setDisabilities] = useState("");
  const [availabilities, setAvailabilities] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentLength, setEmploymentLength] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      fullName,
      studentId,
      email,
      phoneNumber,
      address,
      GPA,
      major,
      workExperience,
      additionalInfo
    );
    setStatus("Application submitted successfully!");
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Invalid file type. Please upload a PDF file.");
    }
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
              checked={hasWorkExperience === true}
              onChange={() => setHasWorkExperience(true)}
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
              checked={hasWorkExperience === false}
              onChange={() => setHasWorkExperience(false)}
            />
            <label htmlFor="no">No</label>
          </div>
        </label>

        {hasWorkExperience && (
          <div>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "0.5rem" }}>Company Name:</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
              <span style={{ marginBottom: "0.5rem" }}>Job Title:</span>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
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
              <span style={{ marginBottom: "0.5rem" }}>Employment Length:</span>
              <input
                type="text"
                value={employmentLength}
                onChange={(e) => setEmploymentLength(e.target.value)}
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
