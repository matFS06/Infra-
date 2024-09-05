import React from 'react';
import { FaUser, FaPlus, FaCog } from 'react-icons/fa';
import './Footer.css'; // Importe o CSS do rodapé

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icon user">
        <FaUser size={24} />
      </div>
      <div className="footer-icon plus">
        <FaPlus size={24} />
      </div>
      <div className="footer-icon cog">
        <FaCog size={24} />
      </div>
    </footer>
  );
};

export default Footer;