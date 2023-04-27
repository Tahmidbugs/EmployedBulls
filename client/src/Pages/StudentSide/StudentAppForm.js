import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { logoutCall } from "../../ContextCalls";
import { Container, Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Navbar";
import { storageRef, storage } from "../../firebase";

import { getDownloadURL } from "firebase/storage";

import { ref, uploadBytesResumable } from "firebase/storage";

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

  const [additionalInfo, setAdditionalInfo] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  const apiKey = "YOUR_AFFINDA_API_KEY";

  // Function to handle file upload
  // const handleFileUpload = async (e) => {
  //   e.preventDefault();
  //   if (!resume) {
  //     setError("Please select a file.");
  //     return;
  //   }
  //   console.log(resume);

  //   const formData = new FormData();
  //   formData.append("file", resume);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8800/uploadresume",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     // do something with response data
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));

    const resumeFile = document.getElementById("resume").files[0];
    const storageRef = ref(storage, `/files/${resumeFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, resumeFile);

    // Create a promise that will resolve when the download URL is fetched
    const downloadURLPromise = new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Upload is running");
          }
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          // When the upload is complete, resolve the promise with the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setResumeLink(downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        }
      );
    });

    const requestData = {
      fullName,
      studentId,
      email,
      phoneNumber,
      address,
      GPA,
      major,
      resume: resumeLink,
    };

    try {
      console.log(requestData);

      // Wait for the download URL to be fetched before making the backend call
      const downloadURL = await downloadURLPromise;
      requestData.resume = downloadURL;

      await axios.post("http://localhost:8800/insert-student", requestData);
      navigate("/studentdashboard");
    } catch (err) {
      console.error(err);
      setStatus("Error submitting application");
    }
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
        minHeight: "100vh"
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
  <Form.Control as="select" onChange={(e) => setMajor(e.target.value)}>
    <option value="">Select a Major</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Computer Engineering">Computer Engineering</option>
    <option value="Biology">Biology</option>
    <option value="Business">Business</option>
    <option value="">Select a Major</option>
<option value="Psychology">Psychology</option>
<option value="Chemistry">Chemistry</option>
<option value="English">English</option>
<option value="History">History</option>
<option value="Mathematics">Mathematics</option>
<option value="Political Science">Political Science</option>
<option value="Environmental Science">Environmental Science</option>
<option value="Graphic Design">Graphic Design</option>
<option value="Journalism">Journalism</option>
<option value="Sociology">Sociology</option>
<option value="Nursing">Nursing</option>
<option value="Education">Education</option>
<option value="Fine Arts">Fine Arts</option>
<option value="Marketing">Marketing</option>
<option value="Physics">Physics</option>
<option value="Anthropology">Anthropology</option>
<option value="Philosophy">Philosophy</option>
<option value="International Relations">International Relations</option>
<option value="Public Health">Public Health</option>

  </Form.Control>
</Form.Group>


        <div>
          <label htmlFor="resume">Upload Resume:</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleResumeChange}
          />
        </div>
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
