import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
  };

  const returnmsg = () => {
    alert('You are already on Home..');
  };

  return (
    <nav>
      <div className="nav-links">
        <ul>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault(); // Prevent the default link behavior
                  returnmsg();
                }
              }}
            >
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <a href="#" onClick={handleLogout}>Logout</a>
            </li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
          {isLoggedIn && (
            <li><Link to="/dashboard">Dashboard</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
