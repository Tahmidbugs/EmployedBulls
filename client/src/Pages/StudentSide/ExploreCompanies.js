import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Navbar";
import axios from "axios";

function ExploreCompanies() {
  const [companies, setCompanies] = useState([
    {
      name: "Google",
      logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      bio: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
      mission_statement:
        "To organize the world's information and make it universally accessible and useful.",
      core_values: "meow meow",
      // employeecount: 100000,
    },
  ]); // add a new state for company data

  React.useEffect(() => {
    axios
      .get("http://localhost:8800/api/student/getAllCompanies")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <h2>
          Explore companies at USF <br />
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "column",
            marginTop: "50px",
            width: "100%",
          }}
        >
          {companies && (
            <>
              {" "}
              {companies.map((company) => (
                <CompanyCard company={company} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CompanyCard({ company }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      style={{
        display: "flex",
        cursor: "pointer",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {company != undefined && (
        <div
          style={{
            backgroundColor: "#252525",
            borderRadius: "10px",
            boxShadow: isHovered
              ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
              : "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #252525",
            color: "#D9D9D9",
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={company.logo}
            style={{
              width: "40%",
              height: "40%",
              borderRadius: "20%",
              marginBottom: "10px",
              marginRight: "20%",
            }}
          />
          <div>
            <h3 style={{ marginBottom: "10px", color: "#FF3953 " }}>
              {company.name}
            </h3>
            <p style={{ marginBottom: "10px" }}>
              <strong>Mission: </strong>
              {company.mission_statement &&
              company.mission_statement.length > 200
                ? company.mission_statement.slice(0, 200) + "..."
                : company.mission_statement}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Bio: </strong>
              {company.bio && company.bio.length > 200
                ? company.bio.slice(0, 200) + "..."
                : company.bio}
            </p>
            <p style={{ marginBottom: "5px" }}>
              <strong>Values:</strong>{" "}
              {company.core_values && company.core_values.length > 200
                ? company.core_values.slice(0, 200) + "..."
                : company.core_values}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreCompanies;
