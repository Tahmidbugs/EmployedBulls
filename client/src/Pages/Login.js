import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { loginCall } from "../ContextCalls";
import "./style.css";
import Lottie from "react-lottie";

import animationdata from "../Assets/Lotties/interview.json";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, dispatch, isFetching } = useContext(AuthContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sanitize email and password fields
      const sanitizedEmail = email.replace(/['";\\]/g, "");
      const sanitizedPassword = password.replace(/['";\\]/g, "");

      console.log("Sanitized email: ", sanitizedEmail);
      console.log("Sanitized password: ", sanitizedPassword);
      if (password == sanitizedPassword) {
        console.log("Password is same as before");
      } else {
        console.log("Password is different", password, sanitizedPassword);
      }

      const credentials = {
        email: sanitizedEmail,
        password: sanitizedPassword,
      };

      loginCall(credentials, dispatch);

      console.log("Email: ", sanitizedEmail, " Password: ", sanitizedPassword);
    } catch (err) {
      setError("Incorrect email or password.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#D9D9D9",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
        //         // background-color: #d9d9d9;
        // background-image: url("https://www.transparenttextures.com/patterns/batthern.png");
        // /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      }}
    >
      <div style={{ display: "flex", marginTop: 20 }}>
        <Link
          to="/registration "
          style={{
            textDecorationColor: "#FF3953",
          }}
        >
          <h4
            style={{
              fontWeight: 100,
              color: "#FF3953",
            }}
            className="activeTab"
          >
            Sign Up
          </h4>
        </Link>
        <h2 style={{ fontSize: "18px", padding: 3 }}>or</h2>
        <Link
          to="/login"
          style={{
            textDecorationColor: "#FF3953",
          }}
        >
          <h4 style={{ fontWeight: 900, color: "#FF3953" }}>Sign In</h4>
        </Link>
      </div>
      <div
        style={{
          height: "85vh",
          width: "30%",
          backgroundColor: "#252525",
          color: "#D9D9D9 ",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {" "}
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{ border: "none", borderWidth: 0, boxShadow: "none" }}
        >
          <label style={{ fontWeight: "500", color: "#FF3953" }}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "#D9D9D9 ",
                color: "#FF3953",
              }}
              placeholder="Enter your email address"
            />
          </label>
          <label
            style={{ fontWeight: "500", color: "#FF3953", marginTop: -20 }}
          >
            Password
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                position: "relative",
              }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    backgroundColor: "#D9D9D9 ",
                    color: "#FF3953",
                    width: "250px",
                  }}
                  placeholder="Enter your cute password"
                />
              </div>
            </div>
          </label>
          {error && <div className="error">{error}</div>}
          <button
            type="submit"
            style={{
              borderRadius: 20,
              padding: 20,
              paddingTop: 10,
              paddingBottom: 10,
              width: 250,
              backgroundColor: "#FF3953",
              color: "#D9D9D9",
              cursor: "pointer",
              fontWeight: "800",
              opacity: 1,
              transition: "opacity 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(event) => {
              event.target.style.opacity = "0.6";
            }}
            onMouseLeave={(event) => {
              event.target.style.opacity = "1.0";
            }}
          >
            Login
          </button>{" "}
        </form>
        <div
          style={{
            marginTop: 80,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Lottie options={defaultOptions} height={200} width={300} />
        </div>
      </div>
      {/* dont have an account? register */}
      <Link to="/registration">
        Don't have an account?
        <button
          className="registerButton"
          style={{
            border: "none",
            color: "#FF3953",
            textDecoration: "underline",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
        >
          Register
        </button>
      </Link>
    </div>
  );
}

export default Login;
