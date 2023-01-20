import React, { useState } from 'react';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail() && validatePassword()) {
      console.log(email, password);
      
    }
  }

  const validateEmail = () => {
    if (!email.includes('.com') && !email.includes('.edu') && !email.includes('aramark.com')) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  }
  
  const validatePassword = () => {
    const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be 8 characters and must include one uppercase letter, one numerical character and one special character.');
      return false;
    }
    setPasswordError('');
    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;
