// Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>Banking Management System</h3>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                
            </div>
        </footer>
    );
};

export default Footer;
