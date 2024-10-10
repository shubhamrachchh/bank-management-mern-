import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', { username, email, password });
      setSuccessMessage('Registration successful! Redirecting to account page...');
      console.log('Registration successful!');

      // Clear the form fields
      setUsername('');
      setEmail('');
      setPassword('');

      // Navigate to the account page after a short delay to show the success message
      setTimeout(() => {
        navigate("/account");
      }, 2000);
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error); 
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
