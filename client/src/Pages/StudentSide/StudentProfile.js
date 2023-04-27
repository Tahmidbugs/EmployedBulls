import axios from "axios";
import React, { useContext, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./studentProfile.css";
import { AuthContext } from "../../Context/AuthContext";
import { useState, useEffect } from "react";
import Nav from "./Navbar";
const StudentProfile = () => {
  const firstname = useRef();
  const lastname = useRef();
  const UID = useRef();
  const GPA = useRef();
  const degree = useRef();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const { user, dispatch } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]); // add a new state for job data




  

  const submitData = async () => {
    const name = firstname + " " + lastname;
    try {
      // const response = await axios.post(
      //   `http://localhost:8800/api/student/updateprofile/${UID}`,
      //   {
      //     name,
      //     UID,
      //     degree,
      //     GPA,
      //   }
      // );
      navigate("/explorejobs");
    } catch (e) {
      console.log("somethings up");
    }
  };

  useEffect(() => {
    let isMounted = true; // add a flag to check if component is mounted
    axios
      .get("http://localhost:8800/api/student/getStudentInfo", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        if (isMounted) {
          // only update state if component is still mounted
          setStudent(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // make second axios call only when student data is available
    axios
      .get("http://localhost:8800/api/student/getStudentJobs", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        if (isMounted) {
          // only update state if component is still mounted
          setJobs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }, [user.email]);

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
        backgroundColor: "#D9D9D9 ",
      }}
    >
      <Nav />
      <div
        style={{
          width: "80%",
          marginLeft: "100px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >

    
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        
        
        <h2 style={{ margin: 0 }}>Set up your profile</h2>
        
      </div>
      
      <div
        className="accountSetup"
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            style={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              border: "none",
              outline: "none",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 5px 10px #888888",
            }}
          >
            <input
              placeholder="Profile Picture"
              type="file"
              style={{ display: "none" }}
            />
          </button>
          <div
            style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "20px" }}
          >
            Upload Profile Picture
          </div>
        </div>
        <input
          placeholder={student.full_name}
          ref={firstname}
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
        />
        
        <input
          placeholder={student.student_id}
          ref={UID}
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
        />
        <input
          placeholder={student.major}
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
        />
        
        <input
          placeholder={student.gpa}
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
          ref={GPA}
        />
        
      </div>
      <button
        onClick={submitData}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 10px",
          textDecoration: "none",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginTop: "20px",
        }}
      >
        Save changes
      </button>
    </div>
    </div>
    </div>

  );
};

export default StudentProfile;
