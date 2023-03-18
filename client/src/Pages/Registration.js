import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { registerCall } from "../ContextCalls";
import { AuthContext } from "../Context/AuthContext";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const credentials = {
        email: email,
        password: password,
        isrecruiter: isrecruiter,
      };
      registerCall(credentials, dispatch);
      setIsLoading(false);
      // if (response.status === 200) {
      if (isrecruiter) {
        navigate("/recruiter-reg");
      } else {
        navigate("/student-reg");
      }

      console.log("asking for verification");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/verify",
        {
          email,
          verificationCode,
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        setVerified(true);
      } else {
        setError("Invalid verification code");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  // const validateEmail = () => {
  //   if (
  //     !email.includes(".com") &&
  //     !email.includes(".edu") &&
  //     !email.includes("aramark.com")
  //   ) {
  //     setEmailError("Please enter a valid email address.");
  //     return false;
  //   }
  //   setEmailError("");
  //   return true;
  // };
  /* eslint-disable */
  // const validatePassword = () => {
  //   const passwordRegex = new RegExp(
  //     "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  //   );
  //   if (!passwordRegex.test(password)) {
  //     setPasswordError(
  //       "Password must be 8 characters and must include one uppercase letter, one numerical character and one special character."
  //     );
  //     return false;
  //   }
  //   setPasswordError("");
  //   return true;
  // };
  /* eslint-enable */
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
        <button type="submit" className="button">
          Register
        </button>
        <Link to="/login">
          <button type="submit" className="button">
            Have an account? Login
          </button>
        </Link>
      </form>
      {isRegistered && (
        <form className="form" onSubmit={handleVerification}>
          <label>
            Verification code:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      )}
      {verified && <h2>VERIFICATION SUCCESSFUL</h2>}
    </div>
  );
}

export default Registration;
