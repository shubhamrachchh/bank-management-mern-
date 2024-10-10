import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter a username and password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { username: username, password: password });
      if (response.data.success) {
        console.log('Login successful!');
        setIsLoggedIn(true); 
        setSuccessMessage('Login successful!'); 
        setTimeout(() => setSuccessMessage(''), 7000);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <>
      <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>} 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {isLoggedIn && ( 
        <div className="button-container">
          <button onClick={() => navigate("/accountdetails")}>View Account</button>
          <button onClick={() => navigate("/transaction")}>View Transactions</button>
        </div>
      )}
    </div>
    
    </>
  );
};

export default Login;
