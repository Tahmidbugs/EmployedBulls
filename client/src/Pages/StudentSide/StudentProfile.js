import axios from "axios";
import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./studentProfile.css";

const StudentProfile = () => {
  const firstname = useRef();
  const lastname = useRef();
  const UID = useRef();
  const GPA = useRef();
  const degree = useRef();
  const navigate = useNavigate();

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
      navigate("/jobfeed");
    } catch (e) {
      console.log("somethings up");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F0FFF4",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 5px 10px #888888",
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
        <h4 style={{ margin: 0 }}>skip</h4>
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
          placeholder="First Name"
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
          placeholder="Last Name"
          ref={lastname}
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
        />
        <input
          placeholder="UID"
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
          placeholder="USF Major"
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
        />
        <input
          placeholder="Degree"
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
          ref={degree}
        />
        <input
          placeholder="Major GPA"
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
          ref={GPA}
        />
        <input
          placeholder="Preferred Job Type"
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
        />
        <input
          placeholder="Availability"
          style={{
            padding: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #DDDDDD",
            marginBottom: "20px",
          }}
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
        Get started
      </button>
    </div>
  );
};

export default StudentProfile;
