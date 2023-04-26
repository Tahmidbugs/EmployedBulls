import React from "react";
import Logo from "../Assets/logo.gif";
// import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons';
import AnimationData from "../Assets/Lotties/student.json";
import AnimationData2 from "../Assets/Lotties/recruiter.json";
import Lottie from "react-lottie";

function LandingPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: AnimationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);

  return (
    <div style={{ backgroundColor: "#D9D9D9 ", fontFamily: "Roboto" }}>
      <header
        style={{
          backgroundColor: "#242424",
          paddingBottom: -20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // maxWidth: '850px',
            // margin: '0 auto',
          }}
        >
          {/* <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            EmployedBulls
          </h1> */}
          <img
            src={Logo}
            alt="EmployedBulls"
            style={{ width: "240px", marginTop: -20 }}
          />
        </div>
      </header>
      <section style={{ padding: "80px 0" }}>
        <div
          style={{ margin: "0px auto", textAlign: "center", marginTop: -50 }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "#CEF848", fontStyle: "italic" }}>
              HANDSHAKE
            </span>
            {"  "}
            might only get you a hand shake,
            <br />{" "}
            <span style={{ color: "#FF3953 ", fontStyle: "italic" }}>
              EmployedBulls
            </span>{" "}
            will get you a job
          </h2>
          <h2
            style={{ fontSize: "1.5rem", color: "#333", marginBottom: "50px" }}
          >
            Join the Bulls revolution: Get an on campus job today, or
            tomorrow...
          </h2>
          {/* <FontAwesomeIcon icon={faUsers} beat /> */}

          <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#242424 ",
                  padding: "20px",
                  borderRadius: "20px",
                  width: "25%",
                  transform: isHovered ? "scale(1.1)" : "scale(1.0)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <h5 style={{ color: "#D9D9D9 " }}>
                  I'm a USF Bulls looking for job
                </h5>
                <Lottie options={defaultOptions} height={250} width={250} />
                <a
                  href="/login"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#FF3953 ",
                    color: "#D9D9D9 ",
                    padding: 10,
                    borderRadius: 20,
                    textDecoration: "none",
                  }}
                >
                  Explore jobs
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#242424 ",
                  padding: "20px",
                  borderRadius: "20px",
                  width: "25%",
                  transform: isHovered2 ? "scale(1.1)" : "scale(1.0)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                <h5 style={{ color: "#D9D9D9 " }}>
                  I'm a recruiter looking for USF Bulls
                </h5>
                <Lottie options={defaultOptions2} height={250} width={250} />

                <a
                  href="/login"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#FF3953 ",
                    color: "#D9D9D9 ",
                    padding: 10,
                    borderRadius: 20,
                    textDecoration: "none",
                  }}
                >
                  Explore candidates
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "50px",
            }}
          >
            How it works
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
              <i
                className="fa fa-users"
                style={{
                  fontSize: "3rem",
                  color: "#333",
                  marginBottom: "20px",
                }}
              ></i>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Search Jobs
              </h3>
              <p style={{ color: "#666" }}>
                Find on campus openings that are right for you and apply to them
                immediately.
              </p>
            </div>
            <div style={{ flex: 1, marginRight: "20px" }}>
              <i
                className="fa fa-file-text"
                style={{
                  fontSize: "3rem",
                  color: "#333",
                  marginBottom: "20px",
                }}
              ></i>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Upload Resume
              </h3>
              <p style={{ color: "#666" }}>
                Upload your resume, apply and let employers find you{" "}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <i
                className="fa fa-comments"
                style={{
                  fontSize: "3rem",
                  color: "#333",
                  marginBottom: "20px",
                }}
              ></i>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Connect with Recruiters
              </h3>
              <p style={{ color: "#666" }}>
                Get in touch with the companies you want to work for and
                schedule interviews.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer
        style={{ backgroundColor: "#333", color: "#fff", padding: "20px" }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <p style={{ fontSize: "1.2rem" }}>
            © 2023 EmployedBulls. All rights reserved.
          </p>
          <p>
            A database design project by Tahmid Ahmed, Musa Al Sathman Gazi, and
            Abdur Rahman Bin Sharif
          </p>
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;
