// src/components/Header/Header.jsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import MenuAccount from '../../component/shared/AccountMenu/AccountMenu';
import HistoryComp from './HistoryComp';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // State to control HistoryComp visibility
  const userLogin = useSelector((state) => state.userReducer.userLogin);

  const handleNavToggle = (e) => {
    e.preventDefault();
    setIsNavOpen(!isNavOpen);
  };

  const toggleHistory = (e) => {
    e.preventDefault();
    setShowHistory(!showHistory); // Toggle showHistory state
  };

  return (
    <>
      <header className="header_section" style={{background:'#60badb'}}>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="home">
              <img src="https://imgur.com/V1zXtZN.jpg" alt="" style={{ height: '40px', width:'50px', marginRight: '8px' }}/>
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
                  <a className="nav-link" href="home/view-koi">Quản lí cá Koi</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="assignKoi">Đăng kí cá Koi?</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={toggleHistory}>Lịch sử</a> {/* Updated link */}
                </li>
              </ul>
              
              <div className="user_option">
                {userLogin ? <MenuAccount/> : <Link to="/login">Login</Link>}
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

      {/* Conditionally render HistoryComp based on showHistory state */}
      {showHistory && <HistoryComp />}
    </>
  );
};

export default Header;
