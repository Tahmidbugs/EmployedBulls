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
      }}
    >
      <div>
        <h2>Set up your profile</h2>
        <h4>skip</h4>
      </div>
      <div
        className="accountSetup"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button style={{ borderRadius: "50%", width: 50, height: 50 }}>
          <input
            placeholder="Profile Picture"
            type="file"
            style={{ display: "none" }}
          />
        </button>
        <input placeholder="First Name" ref={firstname} />
        <input placeholder="Last Name" ref={lastname} />
        {/* <input placeholder="Email" type="email" ref={email} /> */}
        <input placeholder="UID" ref={UID} />
        <input placeholder="USF Major" />
        <input placeholder="GPA" ref={GPA} />
        <input placeholder="Resume" type="file" />
        <input placeholder="Degree" ref={degree} />
        <input placeholder="Preferred Job Type" />
        <input placeholder="Availability" />
      </div>
      <button onClick={submitData}>Get started</button>
    </div>
  );
};

export default StudentProfile;
