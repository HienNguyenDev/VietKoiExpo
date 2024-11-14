// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.scss';
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleNavToggle = (e) => {
    e.preventDefault();
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header_section" style={{background:'#60badb'}}>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="" />
            <span>VietKoiExpo</span>
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={handleNavToggle}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? 'lg_nav-toggle' : ''}`} 
               id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="index.html">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">Quản lí cá Koi</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="work.html">Đăng kí cá Koi?</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="category.html">Thông báo</a>
              </li>
            </ul>
            
            <div className="user_option">
              <a href="#">
                <span>Login</span>
              </a>
              <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                <button className="btn my-2 my-sm-0 nav_search-btn" type="submit" />
              </form>
            </div>
          </div>

          <div>
            <div className={`custom_menu-btn ${isNavOpen ? 'menu_btn-style' : ''}`}>
              <button onClick={handleNavToggle}>
                <span className="s-1"></span>
                <span className="s-2"></span>
                <span className="s-3"></span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;