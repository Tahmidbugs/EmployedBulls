import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setisRegistered] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        { email, password, username }
      );
      setIsLoading(false);
      if (response.status === 200) {
        setisRegistered(true);
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
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
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <Link to="/login">
          <button type="submit">Don't have an account? Login</button>
        </Link>
      </form>
      {isRegistered && (
        <form onSubmit={handleVerification}>
          <label>
            Verification code:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      )}
      {verified && <h2>VERIFICATION SUCCESSFUL</h2>}
    </div>
  );
}

export default Registration;
