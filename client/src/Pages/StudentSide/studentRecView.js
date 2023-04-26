import React from "react";
import Nav from "./Navbar";

function StudentRecView(props) {
  const { name, studentId, email, gpa, major } = props;

  // Dummy data
  const resumeUrl =
    "https://firebasestorage.googleapis.com/v0/b/employedbullsfirebase.appspot.com/o/files%2FAbdurRahmanBinSharif_Resume_Spring23.pdf?alt=media&token=073fb1b0-ba4d-4d13-aaa7-497c65cfa4ce";

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Nav />
      <div
        style={{
          width: "70%",
          marginLeft: "100px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ animation: "smooth-move 1.5s infinite" }}>
          Applicant Information
        </h1>

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

        <p style={{ 
  fontFamily: "Arial, sans-serif", 
  fontWeight: "bold", 
  fontSize: "1.2rem", 
  marginBottom: "10px" 
}}>
  Name: Abdur
</p>
<p style={{ 
  fontFamily: "Arial, sans-serif", 
  fontSize: "1rem", 
  marginBottom: "5px" 
}}>
  Student ID: 123456
</p>
<p style={{ 
  fontFamily: "Arial, sans-serif", 
  fontSize: "1rem", 
  marginBottom: "5px" 
}}>
  Email: abdurmonke@example.com
</p>
<p style={{ 
  fontFamily: "Arial, sans-serif", 
  fontSize: "1rem", 
  marginBottom: "5px" 
}}>
  GPA: 3.0
</p>
<p style={{ 
  fontFamily: "Arial, sans-serif", 
  fontSize: "1rem", 
  marginBottom: "10px" 
}}>
  Major: Computer Science
</p>

        <iframe src={resumeUrl} width="100%" height="600px"></iframe>
      </div>
    </div>
  );
}

export default StudentRecView;
