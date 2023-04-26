import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { registerCall } from "../ContextCalls";
import { AuthContext } from "../Context/AuthContext";
import Lottie from "react-lottie";
import animationData from "../Assets/Lotties/student.json";
import animationData2 from "../Assets/Lotties/recruiter.json";

import Webcam from "react-webcam"; // or another camera library
import {
  BsFillEmojiSunglassesFill,
  BsFillEmojiSmileFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiFrownFill,
} from "react-icons/bs";
function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setisRegistered] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [isrecruiter, setIsrecruiter] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [uid, setUID] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const webcamRef = React.useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setShowCamera(false);
    // console.log(imageSrc);
    verifyIdentity(imageSrc);
  }, [webcamRef]);

  const verifyIdentity = async (imageSrc) => {
    const response = await axios.post(
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBDVaArp8HtU6bTrG7bM7ATEbPa60iDPdc",
      {
        requests: [
          {
            image: {
              content: imageSrc.split(",")[1],
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 1,
              },
            ],
          },
        ],
      }
    );

    const uidRegex = /U\d{4}-\d{4}/;
    const extractedText = response.data.responses[0].fullTextAnnotation.text;
    const match = extractedText.match(uidRegex);
    console.log(extractedText);
    console.log(match);
    if (match && match.length > 0) {
      const uid = match[0];
      console.log(uid);
      setUID(`${uid}`);
      setVerified(true);
    } else {
      alert("Invalid UID, please re-take the photo.");
    }

    console.log(extractedText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify your identity first.");
      return;
    }

    setIsLoading(true);

    try {
      const credentials = {
        email: email,
        password: password,
        isrecruiter: isrecruiter,
        uid: uid,
      };
      registerCall(credentials, dispatch);
      setIsLoading(false);
      // if (response.status === 200) {
      if (isrecruiter) {
        navigate("/recruiter-reg");
      } else {
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
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
        <Link to="/registration">
          <h4
            style={{
              fontWeight: 900,
              color: "#FF3953",
            }}
            className="activeTab"
          >
            Sign Up
          </h4>
        </Link>
        <h2 style={{ fontSize: "18px", padding: 3 }}>or</h2>
        <Link to="/login">
          <h4 style={{ fontWeight: 100, color: "#FF3953" }}>Sign In</h4>
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
              }}
              placeholder="Enter your email address"
            />
            {emailError && <div className="error">{emailError}</div>}
          </label>
          <br />
          <label
            style={{ fontWeight: "500", color: "#FF3953", marginTop: -40 }}
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
                  placeholder="Enter a cute password"
                />
                {password.length < 3 && (
                  <BsFillEmojiFrownFill
                    size={30}
                    color="#FF3953"
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                {password.length >= 3 && password.length < 5 && (
                  <BsFillEmojiNeutralFill
                    size={30}
                    color="#FF3953"
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                {password.length >= 5 && password.length < 7 && (
                  <BsFillEmojiSmileFill
                    size={30}
                    color="#FF3953"
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                {password.length >= 7 && (
                  <BsFillEmojiSunglassesFill
                    size={30}
                    color="#FF3953"
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </div>
            </div>
          </label>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: "1rem",

              // marginBottom: "1rem",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                color: "#555",
              }}
            >
              <input
                type="checkbox"
                checked={isrecruiter}
                onChange={() => setIsrecruiter(!isrecruiter)}
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  margin: "0 0.5rem 0 0",
                  backgroundColor: "black",

                  border: "2px solid #ccc",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              Register as a Recruiter
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                color: "#555",
              }}
            >
              <input
                type="checkbox"
                checked={!isrecruiter}
                onChange={() => setIsrecruiter(!isrecruiter)}
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  margin: "0 0.5rem 0 0",

                  border: "2px solid #ccc",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              Register as a Student
            </label>
          </div>

          <br />
          <div
            className="camera-container"
            style={{
              display: "flex",
              flexDirection: "center",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {showCamera ? (
              <div
                className="webcam"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <button
                    className="button"
                    style={{ borderRadius: 10, marginTop: 10 }}
                    onClick={() => setShowCamera(false)}
                  >
                    Close Camera
                  </button>
                  <button
                    className="button"
                    style={{ borderRadius: 10, marginTop: 10 }}
                    onClick={capture}
                  >
                    Capture
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCamera(true)}
                disabled={verified}
                style={{
                  borderRadius: 10,
                  marginTop: 10,
                  backgroundColor: "#FF3953",
                  color: "#D9D9D9",
                  padding: 10,
                  border: "none",
                  fontWeight: "400",
                }}
              >
                {!verified
                  ? `Pull out your ${
                      isrecruiter ? "Company" : "Student"
                    } ID and verify yourself`
                  : "Verified"}
              </button>
            )}
            {verified && <p>UID: {uid}</p>}
          </div>
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
              fontWeight: "800",
            }}
          >
            Register
          </button>
        </form>
        {!showCamera && (
          <div
            style={{
              marginTop: 50,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {isrecruiter && (
              <Lottie options={defaultOptions2} height={150} width={200} />
            )}
            {!isrecruiter && (
              <Lottie options={defaultOptions} height={200} width={200} />
            )}
          </div>
        )}
      </div>
      <Link to="/registration">
        Already have an account?
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
          Sign in
        </button>
      </Link>
    </div>
  );
}

export default Registration;
