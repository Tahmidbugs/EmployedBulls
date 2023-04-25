import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { loginCall } from "../ContextCalls";
import "./style.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, dispatch, isFetching } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sanitize email and password fields
      const sanitizedEmail = email.replace(/['";\\]/g, '');
      const sanitizedPassword = password.replace(/['";\\]/g, '');

      console.log("Sanitized email: ", sanitizedEmail);
      console.log("Sanitized password: ", sanitizedPassword);
      if(password==sanitizedPassword)
      {
        console.log("Password is same as before");
      }
      else
      {
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
    <div className="container">
      <h1>Log in</h1>
      <h3>If you don't have an account click here:</h3>
      <br />

      <br />
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        {error && <div className="error">{error}</div>}
        <br />
        <button type="submit">Login</button>
      </form>
      {/* dont have an account? register */}
      <Link to="/registration">
        Don't have an account?
        <button
          className="registerButton"
          style={{
            border: "none",
            color: "blue",
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
