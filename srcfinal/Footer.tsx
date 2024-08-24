// src/Footer.tsx

import React from 'react';
import { FaUser, FaPlus, FaCog } from 'react-icons/fa';
import './Footer.css'; // Importe o CSS do rodapé

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icon">
        <FaUser size={24} />
      </div>
      <div className="footer-icon center-icon">
        <FaPlus size={24} />
      </div>
      <div className="footer-icon">
        <FaCog size={24} />
      </div>
    </footer>
  );
};

export default Footer;
