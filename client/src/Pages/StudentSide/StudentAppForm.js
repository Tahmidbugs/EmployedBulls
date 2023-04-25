import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { logoutCall } from "../../ContextCalls";
import { Container, Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Navbar";

const StudentAppForm = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Nav />
      <div style={{ width: "80%" }}>
        <div>
          <FormContainer />
        </div>
      </div>
    </div>
  );
};

const FormContainer = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  console.log("user at form container: ", user);

  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState(user.email);
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <h1>Student Application Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStudentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student ID"
            onChange={(e) => setStudentId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicGPA">
          <Form.Label>GPA</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter GPA"
            onChange={(e) => setGPA(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicMajor">
          <Form.Label>Major</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Major"
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicWorkExperience">
          <Form.Label>Work Experience</Form.Label>
          <Form.Check
            type="checkbox"
            label="Yes"
            onChange={(e) =>
              setWorkExperience({
                ...workExperience,
                hasWorkExperience: e.target.checked,
              })
            }
          />
        </Form.Group>

        {workExperience.hasWorkExperience && (
          <div>
            <Form.Group controlId="formBasicCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    companyName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Position"
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    position: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicResponsibilities">
              <Form.Label>Responsibilities</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Responsibilities"
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    responsibilities: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicStartYear">
              <Form.Label>Start Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Start Year"
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    startYear: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicEndYear">
              <Form.Label>End Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter End Year"
                onChange={(e) =>
                  setWorkExperience({
                    ...workExperience,
                    endYear: e.target.value,
                  })
                }
              />
            </Form.Group>
          </div>
        )}
        <button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            color: "white",
          }}
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default StudentAppForm;
