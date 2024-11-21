// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import MenuAccount from '../../component/shared/AccountMenu/AccountMenu';
import HistoryComp from './HistoryComp';
import { Button, Modal } from 'antd';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userLogin = useSelector((state) => state.userReducer.userLogin);
  const navigate = useNavigate();

  const handleNavToggle = (e) => {
    e.preventDefault();
    setIsNavOpen(!isNavOpen);
  };
  const handleProtectedRoute = (e, path) => {
    e.preventDefault();
    if (!userLogin) {
      setIsModalVisible(true);
      return;
    }
    if (path === 'history') {
      setShowHistory(!showHistory);
    } else {
      navigate(path);
    }
  };
  return (
    <>
      <header className="header_section" style={{background:'#60badb'}}>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <Link className="navbar-brand" to="/">
              <img src="https://imgur.com/V1zXtZN.jpg" alt="" style={{ height: '40px', width:'50px', marginRight: '8px' }}/>
              <span>VietKoiExpo</span>
            </Link>
            
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
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => handleProtectedRoute(e, '/home/view-koi')}>
                    Quản lí cá Koi
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => handleProtectedRoute(e, '/assignKoi')}>
                    Đăng kí cá Koi?
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => handleProtectedRoute(e, '/history')}>
                    Lịch sử
                  </a>
                </li>
              </ul>
              
              <div className="user_option">
                {userLogin ? <MenuAccount/> : <Link to="/login">Login</Link>}
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

      {showHistory && userLogin && <HistoryComp />}
      
      <Modal
        title="Login Required"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="login"
            variant="contained"
            color="primary"
            style={{ color: '#000' }}
            onClick={() => {
              setIsModalVisible(false);
              navigate('/login');
            }}
          >
            Go to Login
          </Button>
        ]}
      >
        <p>You need to log in to access this feature.</p>
      </Modal>
    </>
  );
};

export default Header;