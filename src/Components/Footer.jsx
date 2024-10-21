import React from 'react';
import './Footer.css';
import './Home.css';


const Footer = () => {


  return (
  <div className='footer-container'>
    <footer className="py-3 my-4">
      <p className="text-center text-body-secondary">© 2024 Handong, Univ</p>
      <ul className="nav justify-content-center pb-3 mb-3">
        
        <li className="nav-item">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
        <li className="nav-item">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
        <li className="nav-item">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
      </ul>
    </footer>
    </div>    
  );
};

export default Footer;
