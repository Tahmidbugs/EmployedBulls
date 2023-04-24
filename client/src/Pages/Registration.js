import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { registerCall } from "../ContextCalls";
import { AuthContext } from "../Context/AuthContext";
import Webcam from "react-webcam"; // or another camera library

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
    <div className="container">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="error">{emailError}</div>}
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <br />
        <label className="rec-checkbox">
          <input
            type="checkbox"
            checked={isrecruiter}
            onChange={() => setIsrecruiter(!isrecruiter)}
          />
          Register as a Recruiter
        </label>
        <label className="rec-checkbox">
          <input
            type="checkbox"
            checked={!isrecruiter}
            onChange={() => setIsrecruiter(!isrecruiter)}
          />
          Register as a student
        </label>
        <br />
        <div className="camera-container">
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
                width={400}
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
            <button className="button" onClick={() => setShowCamera(true)}>
              Verify Identity
            </button>
          )}
          {verified && <p>Identity Verified! UID: {uid}</p>}
        </div>
        <button type="submit" className="button">
          Register
        </button>
        <Link to="/login">
          <button type="submit" className="button">
            Have an account? Login
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Registration;
