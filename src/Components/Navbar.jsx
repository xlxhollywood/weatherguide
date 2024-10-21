import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './images/logo.png'; // 로고 이미지 import

const Navbar = () => {
  return (
    <div>
      <header>
        <div className='logo-box'>
          <NavLink to="/">
            <img className='logo' src={logo} alt="WeatherGuide Logo" />
          </NavLink>
        </div>
        <div className='nav-box'>
          <NavLink to="/all">Comments</NavLink>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
