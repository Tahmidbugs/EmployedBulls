import React, { useState } from 'react';

const StudentAppForm = () => {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [GPA, setGPA] = useState('');
  const [major, setMajor] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [companyName, setCompanyName] = useState("");
const [position, setPosition] = useState("");
const [responsibilities, setResponsibilities] = useState("");
const [hasWorkExperience, setHasWorkExperience] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullName, studentId, email, phoneNumber, address, GPA, major, workExperience, additionalInfo);
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

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h1>On-Campus Job Application Form</h1>
      <label>
        Full Name:
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </label>
      <br />
      <label>
        Student ID:
        <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
      </label>
      <br />
      <label>
        GPA:
        <input type="text" value={GPA} onChange={e => setGPA(e.target.value)} required />
      </label>
      <br />
      <label>
        Major:
        <input type="text" value={major} onChange={e => setMajor(e.target.value)} required />
      </label>
      <br />
      
      {/* <label>
  Work Experience:
  <textarea 
    value={workExperience} 
    onChange={e => setWorkExperience(e.target.value)} 
    rows={8} 
    cols={30}
    className="work-experience-input" 
    required 
  />
</label> */}
<label>
        Do you have previous work experience?
        <input
          type="checkbox"
          checked={hasWorkExperience}
          onChange={() => setHasWorkExperience(!hasWorkExperience)}
        />
      </label>
      <br />
      {hasWorkExperience && (
        <><>
                      <label>
                          Company Name:
                          <input
                              type="text"
                              value={companyName}
                              onChange={e => setCompanyName(e.target.value)}
                              required />
                      </label>
                      <br />
                      <label>
                          Position:
                          <input
                              type="text"
                              value={position}
                              onChange={e => setPosition(e.target.value)}
                              required />
                      </label>

                      <br />
                  </><label>
                          Additional Information:
                          <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} />
                      </label><br /></>)}
      {status && <div>{status}</div>}
    </form>
    <br/>
    <br/>
    <br/>
    <h1>Upload Resume</h1>
      <input type="file" onChange={handleChange} accept=".pdf" />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {file && <div>{file.name}</div>}
        <br/>
        <br/>
        <button type="submit">Submit</button>
    </div>
  );
}

export default StudentAppForm;

