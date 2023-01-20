import React, { useState } from "react";
import axios from "axios";

function Reg() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Send a request to the server to send the verification code
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        { email }
      );
      setIsLoading(false);
      if (response.status === 200) {
        // Show the verification code input field
        setIsVerified(true);
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
      // Send a request to the server to verify the code
      const response = await axios.post("http://localhost:8800/api/verify", {
        email,
        verificationCode,
      });
      setIsLoading(false);
      if (response.status === 200) {
        // Proceed with the registration process
        // ...
      } else {
        setError("Invalid verification code");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

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
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send verification code"}
        </button>
      </form>
      {isVerified && (
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
      {error && <p>{error}</p>}
    </div>
  );
}

export default Reg;
