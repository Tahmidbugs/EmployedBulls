import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { logoutCall } from "../../ContextCalls";
import "./studentappform.css";
// ApplicationForm: A few prefilled data, cover letter option,
//         availabilities, disabilities etc
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
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">On-Campus Job Application Form</h1>
        <label className="form-label">
          Full Name:
          <input
            type="text"
            value={fullName}
            className="form-input"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Student ID:
          <input
            type="text"
            value={studentId}
            className="form-input"
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          University Email:
          <input
            type="email"
            value={email}
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        {/* For the phone number I am changing the type for now. Keu error dekhle eita thik kore nish khek */}
        <label className="form-label">
          Phone Number:
          <input
            className="form-input"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Address:
          <input
            type="text"
            value={address}
            className="form-input"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          GPA:
          <input
            type="text"
            value={GPA}
            className="form-input"
            onChange={(e) => setGPA(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Major:
          <input
            type="text"
            value={major}
            className="form-input"
            onChange={(e) => setMajor(e.target.value)}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Do you have previous work experience?
          <input
            type="checkbox"
            checked={hasWorkExperience}
            className="form-input"
            onChange={() => setHasWorkExperience(!hasWorkExperience)}
          />
        </label>
        <br />
        {hasWorkExperience && (
          <>
            <>
              <label className="form-label">
                Company Name:
                <input
                  type="text"
                  value={companyName}
                  className="form-input"
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </label>
              <br />
              <label className="form-label">
                Position:
                <input
                  type="text"
                  value={position}
                  className="form-input"
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </label>

              <br />
            </>
            <label className="form-label">
              Additional Information:
              <textarea
                value={additionalInfo}
                className="form-input"
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </label>
            <br />
          </>
        )}
        {status && <div>{status}</div>}
      </form>
      <br />
      <br />
      <h1>Upload Resume:</h1>
<label htmlFor="file-upload" className="custom-file-upload">
  <i ></i> Upload Resume (PDF only)
</label>
<input
  id="file-upload"
  type="file"
  onChange={handleChange}
  accept=".pdf"
  style={{ display: "none" }}
/>
{error && <div style={{ color: "red" }}>{error}</div>}
{file && <div>{file.name}</div>}
      <br />
      <br />
      <label htmlFor="file-upload" className="custom-file-upload">
  <i ></i> Upload Cover Letter (Optional, PDF only)
</label>
<input
  id="file-upload"
  type="file"
  onChange={handleChange}
  accept=".pdf"
  style={{ display: "none" }}
/>
{error && <div style={{ color: "red" }}>{error}</div>}
{file && <div>{file.name}</div>}
      <br />
      <br />
      <label className="form-label">
        Disabilities(if any):
        <textarea
          value={disabilities}
          className="form-input"
          onChange={(e) => setDisabilities(e.target.value)}
        />
      </label>
      <label className="form-label">
        Availabilities for Work:
        <textarea
          value={availabilities}
          className="form-input"
          onChange={(e) => setAvailabilities(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </div>
  );
};

export default StudentAppForm;
