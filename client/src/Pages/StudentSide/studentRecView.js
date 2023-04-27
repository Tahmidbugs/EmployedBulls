import React from "react";
import Nav from "../RecruiterSide/Dashboard Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function StudentRecView(props) {
  const location = useLocation();
  const applicant = new URLSearchParams(location.search).get("applicant");
  const resumeUrl =
    "https://firebasestorage.googleapis.com/v0/b/employedbullsfirebase.appspot.com/o/files%2FAbdurRahmanBinSharif_Resume_Spring23.pdf?alt=media&token=073fb1b0-ba4d-4d13-aaa7-497c65cfa4ce";
  const [student, setStudent] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    gpa: "",
    profilepic: "",
    resume: "",
  });
  console.log("trying to get student info", applicant);
  React.useEffect(() => {
    axios
      .get("http://localhost:8800/api/student/getStudent", {
        params: {
          email: applicant,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
      }}
    >
      <Nav />
      <div
        style={{
          width: "80%",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#FF3953" }}>Applicant Information</h1>

        <style>
          {`
            @keyframes smooth-move {
              0% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(15px);
              }
              100% {
                transform: translateX(0);
              }
            }
          `}
        </style>
        <img
          src={student.profilepic}
          alt="logo"
          style={{ height: 150, width: 150, borderRadius: 10 }}
        />
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginBottom: "10px",
          }}
        >
          Name: {student.full_name}
        </p>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1rem",
            marginBottom: "5px",
          }}
        >
          Student ID: {student.student_id}
        </p>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1rem",
            marginBottom: "5px",
          }}
        >
          Email: {student.email}
        </p>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1rem",
            marginBottom: "5px",
          }}
        >
          GPA: {student.gpa}
        </p>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1rem",
            marginBottom: "10px",
          }}
        >
          Major: {student.major}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            src={student.resume}
            title="resume"
            style={{ width: "1000px", height: "800px", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentRecView;
