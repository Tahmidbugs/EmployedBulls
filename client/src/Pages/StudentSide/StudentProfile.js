import React from "react";
import "./studentProfile.css";
const StudentProfile = () => {
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
        <input placeholder="First Name" />
        <input placeholder="Last Name" />
        <input placeholder="Email" type="email" />

        <input placeholder="Resume" type="file" />
        <input placeholder="Degree" />
        <input placeholder="USF Major" />
        <input placeholder="GPA" />
        <input placeholder="Preferred Job Type" />
        <input placeholder="Job History" />
        <input placeholder="Availability" />
      </div>
      <button>Get started</button>
    </div>
  );
};

export default StudentProfile;
