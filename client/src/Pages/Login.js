import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Aikhane server side er shathe validation korte hobe jeta ami parina
      console.log("Email: ", email, " Password: ", password);
    } catch (err) {
      setError("Incorrect email or password.");
    }
  }

  return (
    <div>
    <p1>If you don't have an account click here:</p1>
    <br/>
    <button type="submit">Register as a Student</button>
    <button type="submit">Register as a Recruiter</button>
    <br/>
    <br/>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <br />
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;
